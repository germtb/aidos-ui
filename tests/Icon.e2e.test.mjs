import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";
import { build } from "tsup";
import { chromium } from "playwright-core";

let browser;
let directory;
let icon;
const serverHTML = [];

before(async () => {
  directory = await mkdtemp(path.join(os.tmpdir(), "aidos-icons-"));
  const options = {
    config: false,
    entry: ["tests/fixtures/Icons.tsx"],
    tsconfig: "tsconfig.build.json",
    noExternal: [/.*/],
    define: { "process.env.NODE_ENV": '"development"' },
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
    platform: "browser",
    format: ["iife"],
    outDir: path.join(directory, "client"),
  });
  const server = createRequire(import.meta.url)(
    path.join(directory, "server/Icons.cjs"),
  );
  icon = server.icon;
  serverHTML.push(server.fixture.serverHTML());
  server.fixture.preload();
  serverHTML.push(server.fixture.serverHTML());
  browser = await chromium.launch({ channel: "chrome", headless: true });
});

after(async () => {
  await browser?.close();
  if (directory) await rm(directory, { recursive: true });
});

async function fixture(html = "") {
  const page = await browser.newPage();
  page.setDefaultTimeout(5000);
  const requests = [];
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.route("**/*", (route) => {
    requests.push(route.request().url());
    return route.fulfill({
      json: { prefix: "lucide", icons: { check: icon } },
    });
  });
  await page.setContent(`<!doctype html><div id="root">${html}</div>`);
  await page.addScriptTag({
    path: path.join(directory, "client/Icons.global.js"),
  });
  return { page, requests, errors };
}

test("preloaded icons render SVG on the first client commit, before effects", async () => {
  const { page, requests, errors } = await fixture();
  await page.evaluate(() => {
    window.iconFixture.preload();
    window.iconFixture.mount();
  });
  await page.locator("#root svg").waitFor();
  assert.equal(await page.evaluate(() => window.iconFixture.commits[0]), true);
  assert.deepEqual(requests, []);
  assert.deepEqual(errors, []);
  await page.close();
});

test("SSR hydrates without mismatches when icon caches differ", async () => {
  for (const [serverPreloaded, clientPreloaded] of [
    [false, true],
    [true, false],
    [true, true],
  ]) {
    const html = serverHTML[Number(serverPreloaded)];
    assert.ok(!html.includes("<svg"));
    const { page, requests, errors } = await fixture(html);
    await page.evaluate((preloaded) => {
      if (preloaded) window.iconFixture.preload();
      window.iconFixture.mount(true);
    }, clientPreloaded);
    await page.locator("#root svg").waitFor();
    assert.equal(
      await page.evaluate(() => window.iconFixture.commits[0]),
      false,
    );
    assert.deepEqual(await page.evaluate(() => window.iconFixture.errors), []);
    assert.deepEqual(errors, []);
    assert.equal(requests.length, clientPreloaded ? 0 : 1);
    await page.close();
  }
});
