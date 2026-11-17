import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";
import { build } from "tsup";
import { chromium } from "playwright-core";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Icon } from "aidos-ui";
import { bucket } from "../src/icons/bucket.js";

let browser;
let directory;
let server;
let origin;
const serverHTML = [];
let themeHTML;
let selectedHTML;
const selectedNames = [
  "search",
  "check",
  "activity-square",
  "square-activity",
  "search-large",
  "align-justify",
];
const icons = JSON.parse(
  await readFile(new URL("../src/icons/data/all.json", import.meta.url)),
);

before(async () => {
  directory = await mkdtemp(path.join(os.tmpdir(), "aidos-icons-"));
  const options = {
    config: false,
    entry: ["tests/fixtures/Icons.tsx", "tests/fixtures/IconsSelected.tsx"],
    tsconfig: "tsconfig.build.json",
    noExternal: [/.*/],
    define: { "process.env.NODE_ENV": '"production"' },
    silent: true,
  };
  await build({
    ...options,
    platform: "node",
    format: ["cjs"],
    outDir: path.join(directory, "server"),
  });
  await build({
    ...options,
    entry: [
      "tests/fixtures/Icons.tsx",
      "tests/fixtures/IconsEager.tsx",
      "tests/fixtures/IconsSelected.tsx",
    ],
    platform: "browser",
    format: ["esm"],
    splitting: true,
    minify: true,
    outDir: path.join(directory, "client"),
  });
  const module = createRequire(import.meta.url)(
    path.join(directory, "server/Icons.cjs"),
  );
  serverHTML.push(module.fixture.serverHTML());
  await module.fixture.preload();
  serverHTML.push(module.fixture.serverHTML());
  themeHTML = module.fixture.serverHTML(true);
  const selected = createRequire(import.meta.url)(
    path.join(directory, "server/IconsSelected.cjs"),
  );
  selectedHTML = selected.fixture.serverHTML(false, selectedNames);
  server = createServer(async (request, response) => {
    const name = new URL(request.url, "http://localhost").pathname;
    if (name === "/") {
      response.setHeader("Content-Type", "text/html");
      response.end('<!doctype html><div id="root"></div>');
      return;
    }
    try {
      const file = path.join(directory, "client", path.basename(name));
      response.setHeader("Content-Type", "text/javascript");
      response.end(await readFile(file));
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ channel: "chrome", headless: true });
});

after(async () => {
  await browser?.close();
  await new Promise((resolve) => (server ? server.close(resolve) : resolve()));
  if (directory) await rm(directory, { recursive: true });
});

async function fixture({
  html = "",
  eager = false,
  selected = false,
  darkMode,
} = {}) {
  const page = await browser.newPage();
  page.setDefaultTimeout(5000);
  if (darkMode !== undefined)
    await page
      .context()
      .addCookies([
        { name: "dark-mode", value: String(darkMode), url: origin },
      ]);
  const requests = [];
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("**/*", (route) => {
    assert.ok(
      route.request().url().startsWith(origin),
      "Icons must not use a CDN",
    );
    return route.continue();
  });
  await page.goto(origin);
  await page.locator("#root").evaluate((element, html) => {
    element.innerHTML = html;
  }, html);
  await page.addScriptTag({
    type: "module",
    url: `${origin}/${eager ? "IconsEager" : selected ? "IconsSelected" : "Icons"}.js`,
  });
  await page.waitForFunction(() => !!window.iconFixture);
  page.on("request", (request) => requests.push(request.url()));
  return { page, requests, errors };
}

test("generated chunks and individual imports preserve the complete upstream catalog", async () => {
  const collection = JSON.parse(
    await readFile(
      new URL(
        "../node_modules/@iconify-json/lucide/icons.json",
        import.meta.url,
      ),
    ),
  );
  const names = [
    ...Object.keys(collection.icons),
    ...Object.keys(collection.aliases),
  ].sort();
  assert.deepEqual(Object.keys(icons).sort(), names);
  for (const alias of Object.values(collection.aliases))
    assert.deepEqual(
      Object.keys(alias),
      ["parent"],
      "Alias transforms need support",
    );
  const chunks = await Promise.all(
    Array.from({ length: 32 }, async (_, index) =>
      JSON.parse(
        await readFile(
          new URL(`../src/icons/data/${index}.json`, import.meta.url),
        ),
      ),
    ),
  );
  for (const name of names) {
    let parent = name;
    while (collection.aliases[parent])
      parent = collection.aliases[parent].parent;
    const original = collection.icons[parent];
    await import(`aidos-ui/icons/${name}`);
    const html = renderToStaticMarkup(
      createElement(Icon, { icon: name, size: "medium", color: "primary" }),
    );
    assert.ok(html.includes(original.body), name);
    assert.ok(
      html.includes(
        `viewBox="0 0 ${original.width ?? collection.width} ${original.height ?? collection.height}"`,
      ),
      name,
    );
    for (const catalog of [icons, chunks[bucket(name)]]) {
      const entry = catalog[name];
      const data = typeof entry === "string" ? catalog[entry] : entry;
      assert.equal(data.body, original.body, name);
      assert.equal(data.width ?? 24, original.width ?? collection.width, name);
      assert.equal(
        data.height ?? 24,
        original.height ?? collection.height,
        name,
      );
    }
  }
});

test("lazy icons share chunks and preserve aliases, geometry, and size", async () => {
  const { page, requests, errors } = await fixture();
  const names = [
    "search",
    "search",
    "activity-square",
    "square-activity",
    "github",
    "search-large",
  ];
  await page.evaluate((names) => window.iconFixture.mount(false, names), names);
  await page.waitForFunction(
    (count) => document.querySelectorAll("#root svg").length === count,
    names.length,
  );
  assert.equal(await page.evaluate(() => window.iconFixture.commits[0]), 0);
  assert.equal(requests.length, new Set(names.map(bucket)).size);
  assert.equal(
    await page
      .getByLabel("activity-square", { exact: true })
      .locator("svg")
      .innerHTML(),
    await page
      .getByLabel("square-activity", { exact: true })
      .locator("svg")
      .innerHTML(),
  );
  assert.equal(
    await page
      .getByLabel("search-large", { exact: true })
      .locator("svg")
      .getAttribute("viewBox"),
    "0 0 32 32",
  );
  assert.equal(
    (await page.getByLabel("github", { exact: true }).boundingBox()).width,
    18,
  );
  const loaded = requests.length;
  await page.evaluate(() => window.iconFixture.render(["github"]));
  await page.getByLabel("github", { exact: true }).waitFor();
  assert.equal(requests.length, loaded);
  assert.deepEqual(errors, []);
  await page.close();
});

test("individual imports survive minification, hydrate immediately, and leave other icons lazy", async () => {
  assert.equal((selectedHTML.match(/<svg\b/g) ?? []).length, 5);
  for (const hydrate of [false, true]) {
    const { page, requests, errors } = await fixture({
      selected: true,
      html: hydrate ? selectedHTML : "",
    });
    const serverSVGs = hydrate
      ? await page.locator("#root svg").elementHandles()
      : [];
    await page.evaluate(
      ({ hydrate, names }) => window.iconFixture.mount(hydrate, names),
      { hydrate, names: selectedNames },
    );
    await page
      .getByLabel("align-justify", { exact: true })
      .locator("svg")
      .waitFor();
    assert.equal(await page.evaluate(() => window.iconFixture.commits[0]), 5);
    assert.equal(await page.locator("#root svg").count(), selectedNames.length);
    assert.equal(
      requests.length,
      1,
      "An unimported icon still loads even when it shares a bucket with an eager icon",
    );
    for (const svg of serverSVGs)
      assert.ok(await svg.evaluate((element) => element.isConnected));
    assert.equal(
      await page
        .getByLabel("activity-square", { exact: true })
        .locator("svg")
        .innerHTML(),
      await page
        .getByLabel("square-activity", { exact: true })
        .locator("svg")
        .innerHTML(),
    );
    assert.equal(
      await page
        .getByLabel("search-large", { exact: true })
        .locator("svg")
        .getAttribute("viewBox"),
      "0 0 32 32",
    );
    assert.deepEqual(await page.evaluate(() => window.iconFixture.errors), []);
    assert.deepEqual(errors, []);
    await page.close();
  }
});

test("the side-effect import survives minification and renders every icon on its first commit", async () => {
  const { page, requests, errors } = await fixture({ eager: true });
  const names = Object.keys(icons);
  await page.evaluate((names) => window.iconFixture.mount(false, names), names);
  await page.waitForFunction(
    (count) => document.querySelectorAll("#root svg").length === count,
    names.length,
  );
  assert.equal(
    await page.evaluate(() => window.iconFixture.commits[0]),
    names.length,
  );
  assert.deepEqual(requests, []);
  assert.deepEqual(errors, []);
  await page.close();
});

test("eager SSR icons remain visible through hydration without replacing their SVG", async () => {
  assert.ok(serverHTML[1].includes("<svg"));
  const { page, requests, errors } = await fixture({
    html: serverHTML[1],
    eager: true,
  });
  const svg = await page.locator("#root svg").elementHandle();
  await page.evaluate(() => window.iconFixture.mount(true));
  await page.waitForFunction(() => window.iconFixture.commits.length > 0);
  assert.equal(await page.evaluate(() => window.iconFixture.commits[0]), 1);
  assert.ok(
    await svg.evaluate(
      (element) => element === document.querySelector("#root svg"),
    ),
  );
  assert.deepEqual(await page.evaluate(() => window.iconFixture.errors), []);
  assert.deepEqual(requests, []);
  assert.deepEqual(errors, []);
  await page.close();
});

test("the theme toggle keeps its server-rendered icon while hydrating either saved preference", async () => {
  for (const darkMode of [false, true]) {
    const { page, requests, errors } = await fixture({
      html: themeHTML,
      eager: true,
      darkMode,
    });
    const toggle = page.getByRole("button", { name: "Toggle dark mode" });
    const svg = await toggle.locator("svg").elementHandle();
    assert.ok(svg, "The toggle must contain an SVG before hydration");
    await page.evaluate(() => window.iconFixture.mount(true, ["check"], true));
    await page.waitForFunction(
      (enabled) =>
        document
          .querySelector('[aria-label="Toggle dark mode"]')
          .getAttribute("aria-pressed") === String(enabled) &&
        document.body.classList.contains("dark-mode") === enabled &&
        window.iconFixture.commits.length > 0,
      darkMode,
    );
    assert.equal(await page.evaluate(() => window.iconFixture.commits[0]), 2);
    assert.ok(await svg.evaluate((element) => element.isConnected));
    const before = await toggle.locator("svg").innerHTML();
    await toggle.click();
    await page.waitForFunction(
      (enabled) => document.body.classList.contains("dark-mode") !== enabled,
      darkMode,
    );
    assert.notEqual(await toggle.locator("svg").innerHTML(), before);
    assert.ok(await svg.evaluate((element) => element.isConnected));
    assert.deepEqual(await page.evaluate(() => window.iconFixture.errors), []);
    assert.deepEqual(requests, []);
    assert.deepEqual(errors, []);
    await page.close();
  }
});

test("lazy SSR stays hydration-safe regardless of server or client cache warmth", async () => {
  const warm = await fixture();
  await warm.page.evaluate(() => window.iconFixture.mount());
  await warm.page.locator("#root svg").waitFor();
  const warmHTML = await warm.page.evaluate(() =>
    window.iconFixture.serverHTML(),
  );
  await warm.page.close();
  for (const html of [serverHTML[0], warmHTML]) {
    assert.ok(!html.includes("<svg"));
    for (const clientWarm of [false, true]) {
      const { page, requests, errors } = await fixture({ html });
      if (clientWarm) {
        await page.evaluate(() => window.iconFixture.mount());
        await page.locator("#root svg").waitFor();
        await page.evaluate((html) => {
          window.iconFixture.unmount();
          window.iconFixture.commits.length = 0;
          document.getElementById("root").innerHTML = html;
        }, html);
        requests.length = 0;
      }
      await page.evaluate(() => window.iconFixture.mount(true));
      await page.locator("#root svg").waitFor();
      assert.equal(await page.evaluate(() => window.iconFixture.commits[0]), 0);
      assert.deepEqual(
        await page.evaluate(() => window.iconFixture.errors),
        [],
      );
      assert.deepEqual(errors, []);
      assert.equal(requests.length, clientWarm ? 0 : 1);
      await page.close();
    }
  }
});

test("unknown icons and failed chunk loads keep their placeholders without unhandled errors", async () => {
  const { page, errors } = await fixture();
  await page.route("**/*.js", (route) =>
    route.fulfill({ status: 404, body: "Unavailable" }),
  );
  const failed = page.waitForResponse((response) => response.status() === 404);
  await page.evaluate(() => window.iconFixture.mount(false, ["check"]));
  await failed;
  await page.unroute("**/*.js");
  await page.evaluate(() =>
    window.iconFixture.render(["not-a-real-icon", "__proto__", "folder"]),
  );
  await page.getByLabel("folder", { exact: true }).locator("svg").waitFor();
  assert.equal(
    await page
      .getByLabel("not-a-real-icon", { exact: true })
      .locator("svg")
      .count(),
    0,
  );
  assert.equal(
    await page.getByLabel("__proto__", { exact: true }).locator("svg").count(),
    0,
  );
  assert.deepEqual(errors, []);
  await page.close();
});

test("late chunk arrivals cannot restore a changed or unmounted icon", async () => {
  for (const unmount of [false, true]) {
    const { page, errors } = await fixture();
    const pending = [];
    await page.route("**/*.js", (route) => {
      if (!pending.length) pending.push(route);
      else return route.continue();
    });
    const request = page.waitForRequest((request) =>
      request.url().endsWith(".js"),
    );
    await page.evaluate(() => window.iconFixture.mount(false, ["folder"]));
    await request;
    await page.evaluate(() => window.iconFixture.render(["check"]));
    await page.getByLabel("check", { exact: true }).locator("svg").waitFor();
    if (unmount) await page.evaluate(() => window.iconFixture.unmount());
    const finished = page.waitForEvent(
      "requestfinished",
      (request) => request.url() === pending[0].request().url(),
    );
    await pending[0].continue();
    await finished;
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    assert.equal(await page.getByLabel("folder", { exact: true }).count(), 0);
    assert.equal(await page.locator("#root svg").count(), unmount ? 0 : 1);
    assert.deepEqual(errors, []);
    await page.close();
  }
});
