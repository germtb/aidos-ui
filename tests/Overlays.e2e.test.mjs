import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";
import { build } from "tsup";
import { chromium } from "playwright-core";

let browser;
let directory;

before(async () => {
  directory = await mkdtemp(path.join(os.tmpdir(), "aidos-overlays-"));
  await build({
    config: false,
    entry: ["tests/fixtures/Overlays.tsx"],
    tsconfig: "tsconfig.build.json",
    outDir: directory,
    format: ["iife"],
    platform: "browser",
    noExternal: [/.*/],
    define: { "process.env.NODE_ENV": '"development"' },
    silent: true,
  });
  browser = await chromium.launch({ channel: "chrome", headless: true });
});

after(async () => {
  await browser?.close();
  if (directory) await rm(directory, { recursive: true });
});

async function fixture() {
  const page = await browser.newPage({ viewport: { width: 760, height: 600 } });
  page.setDefaultTimeout(5000);
  await page.route("**/*", (route) => route.abort());
  await page.setContent('<!doctype html><div id="root"></div>');
  await page.addScriptTag({ path: path.join(directory, "Overlays.global.js") });
  return page;
}

test("tooltip escapes clipping without moving focus or scrolling", async () => {
  const page = await fixture();
  const draft = page.getByRole("textbox", { name: "Draft" });
  await draft.focus();
  await page.getByRole("button", { name: "Commit title", exact: true }).hover();
  const tooltip = page.getByRole("tooltip");
  await tooltip.waitFor();
  assert.equal(
    await tooltip.evaluate(
      (element) =>
        new Promise((resolve) => {
          const observer = new IntersectionObserver(([entry]) => {
            observer.disconnect();
            resolve(entry.intersectionRatio);
          });
          observer.observe(element);
        }),
    ),
    1,
  );
  assert.ok(
    await draft.evaluate((element) => document.activeElement === element),
  );
  assert.deepEqual(
    await page
      .locator("#clip")
      .evaluate((element) => [element.scrollLeft, element.scrollTop]),
    [0, 0],
  );
  await page
    .getByRole("button", { name: "Dismiss and update" })
    .evaluate((element) => element.click());
  await tooltip.waitFor({ state: "hidden" });
  await page.close();
});

test("a parent update cannot reopen a dismissed popover", async () => {
  const page = await fixture();
  const trigger = page.getByRole("button", { name: "Open options" });
  const popover = page.getByRole("dialog", { name: "Options" });
  await trigger.click();
  await popover.waitFor();
  await page
    .getByRole("button", { name: "Dismiss and update" })
    .evaluate((element) => element.click());
  await popover.waitFor({ state: "hidden" });
  await trigger.click();
  await popover.getByText("Update 1", { exact: true }).waitFor();
  await page.close();
});

test("cancelled document closure leaves selection with its owner", async () => {
  const page = await fixture();
  await page.getByRole("button", { name: "Close Draft", exact: true }).click();
  assert.equal(
    await page
      .getByRole("tab", { name: "Draft", exact: true })
      .getAttribute("aria-selected"),
    "true",
  );
  await page.close();
});

test("custom search content keeps shared keyboard behavior and submenu focus", async () => {
  const page = await fixture();
  await page.getByRole("combobox", { name: "Find document" }).fill("bet");
  await page
    .getByRole("option")
    .getByText("Document: Beta", { exact: true })
    .waitFor();
  await page.keyboard.press("Enter");
  await page.getByRole("status").getByText("beta", { exact: true }).waitFor();
  assert.ok(
    await page
      .getByRole("menuitem", { name: "Inspect beta" })
      .evaluate((element) => document.activeElement === element),
  );
  await page.close();
});

test("modal completion runs after restoring the editable selection target", async () => {
  const page = await fixture();
  const draft = page.getByRole("textbox", { name: "Draft", exact: true });
  await draft.press("F2");
  await page.getByRole("textbox", { name: "Modal search" }).fill("search");
  await page.getByRole("button", { name: "Select draft" }).click();
  assert.deepEqual(
    await draft.evaluate((input) => [
      document.activeElement === input,
      input.selectionStart,
      input.selectionEnd,
    ]),
    [true, 0, "Keep this draft".length],
  );
  await page.close();
});

test("Escape dismisses a nested selector without closing its modal", async () => {
  const page = await fixture();
  await page.getByRole("textbox", { name: "Draft", exact: true }).press("F2");
  const modal = page.getByRole("dialog", { name: "Search dialog" });
  await modal.getByRole("button", { name: "Provider", exact: true }).click();
  await page.getByRole("option", { name: "Two", exact: true }).press("Escape");
  await page
    .getByRole("listbox", { name: "Provider" })
    .waitFor({ state: "hidden" });
  assert.ok(await modal.isVisible());
  assert.ok(
    await modal
      .getByRole("button", { name: "Provider", exact: true })
      .evaluate((element) => document.activeElement === element),
  );
  await page.close();
});

test("tooltip-wrapped composer metadata stays centered with the action icon", async () => {
  const page = await fixture();
  const composer = page.locator("[data-aidos-composer]");
  const metadata = composer.getByLabel("37% context used");
  const action = composer.getByRole("button", { name: "Send message" });
  for (const fontSize of [16, 24]) {
    await composer.evaluate((element, size) => {
      element.style.fontSize = `${size}px`;
      element.style.lineHeight = "1.5";
    }, fontSize);
    const textBox = await metadata.boundingBox();
    const iconBox = await action.locator(":scope > div").boundingBox();
    assert.ok(
      Math.abs(
        textBox.y + textBox.height / 2 - iconBox.y - iconBox.height / 2,
      ) < 1,
      `Metadata and icon align with ${fontSize}px inherited text`,
    );
  }
  await metadata.focus();
  await page.getByRole("tooltip").waitFor();
  assert.ok(
    await metadata.evaluate((element) => element === document.activeElement),
  );
  await page.close();
});

test("composer preserves composition and multiline drafts until submission", async () => {
  const page = await fixture();
  const input = page.getByRole("textbox", { name: "Message", exact: true });
  await input.fill("Keep this draft");
  await input.dispatchEvent("keydown", { key: "Enter", isComposing: true });
  assert.equal(await input.inputValue(), "Keep this draft");
  assert.equal(await page.getByLabel("Submitted message").textContent(), "");
  await input.press("Shift+Enter");
  assert.equal(await input.inputValue(), "Keep this draft\n");
  await input.press("Enter");
  assert.equal(await input.inputValue(), "");
  assert.equal(
    await page.getByLabel("Submitted message").textContent(),
    "Keep this draft\n",
  );
  await page.close();
});

test("menu overflow hints preserve focus, descriptions and disabled navigation", async () => {
  const page = await fixture();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page
    .getByRole("button", { name: "Choose folder", exact: true })
    .click();
  const menu = page.getByRole("menu", { name: "Folders", exact: true });
  const tooltip = page.getByRole("tooltip");
  assert.equal(await tooltip.count(), 0);
  await page.keyboard.press("ArrowDown");
  const path = "/workspaces/" + "long-directory-name-".repeat(12);
  const item = page.getByRole("menuitem", { name: path, exact: true });
  await tooltip.waitFor();
  assert.equal(await tooltip.innerText(), path);
  assert.ok(await item.evaluate((el) => el === document.activeElement));
  assert.equal(await item.getAttribute("aria-describedby"), "folder-context");
  await page.keyboard.press("Escape");
  await tooltip.waitFor({ state: "hidden" });
  assert.ok(await menu.isVisible());
  assert.ok(await item.evaluate((el) => el === document.activeElement));
  await page.keyboard.press("ArrowDown");
  const disabled = page.getByRole("menuitem", {
    name: "/workspaces/disabled-folder-with-a-long-name",
    exact: true,
  });
  await tooltip.waitFor();
  assert.ok(await disabled.evaluate((el) => el === document.activeElement));
  await page.keyboard.press("Enter");
  assert.equal(await page.getByLabel("Chosen folder").textContent(), "");
  assert.ok(await menu.isVisible());
  await page.keyboard.press("Escape");
  await tooltip.waitFor({ state: "hidden" });
  await page.keyboard.press("Escape");
  await menu.waitFor({ state: "hidden" });
  assert.ok(
    await page
      .getByRole("button", { name: "Choose folder", exact: true })
      .evaluate((el) => el === document.activeElement),
  );
  assert.deepEqual(errors, []);
  await page.close();
});

test("menu hint overrides and descriptions do not repeat the truncated label", async () => {
  const page = await fixture();
  await page
    .getByRole("button", { name: "Choose folder", exact: true })
    .click();
  const tooltip = page.getByRole("tooltip");
  const description = (item) =>
    item.evaluate((el) =>
      el
        .getAttribute("aria-describedby")
        ?.split(" ")
        .map((id) => document.getElementById(id)?.textContent)
        .join(" "),
    );
  const browse = page.getByRole("menuitem", { name: "Browse", exact: true });
  await browse.focus();
  await tooltip.waitFor();
  assert.equal(await tooltip.innerText(), "Choose a folder on disk");
  assert.equal(await description(browse), "Choose a folder on disk");
  const custom = page.getByRole("menuitem", { name: "Custom", exact: true });
  await custom.focus();
  await tooltip.waitFor();
  assert.equal(await tooltip.innerText(), "Custom workspace hint");
  assert.equal(await custom.getAttribute("title"), null);
  assert.equal(await description(custom), "Custom workspace hint");
  await page
    .getByRole("menuitem", {
      name: "/workspaces/suppressed-folder-with-a-long-name",
      exact: true,
    })
    .focus();
  await tooltip.waitFor({ state: "hidden" });
  const offlinePath = "/workspaces/offline-folder-with-a-long-name";
  const offline = page.getByRole("menuitem", {
    name: offlinePath,
    exact: true,
  });
  await offline.focus();
  await tooltip.waitFor();
  assert.equal(
    await tooltip.innerText(),
    offlinePath + "\nNot available offline",
  );
  assert.equal(await description(offline), "Not available offline");
  await page.close();
});

test("hovered menu paths wrap inside a narrow viewport without moving focus", async () => {
  const page = await fixture();
  await page.setViewportSize({ width: 360, height: 600 });
  await page
    .getByRole("button", { name: "Choose folder", exact: true })
    .click();
  const recent = page.getByRole("menuitem", { name: "Recent", exact: true });
  const item = page.getByRole("menuitem", {
    name: "/workspaces/" + "long-directory-name-".repeat(12),
    exact: true,
  });
  await item.hover();
  const tooltip = page.getByRole("tooltip");
  await tooltip.waitFor();
  assert.ok(await recent.evaluate((el) => el === document.activeElement));
  assert.ok(await tooltip.evaluate((el) => el.scrollWidth <= el.clientWidth));
  const box = await tooltip.boundingBox();
  assert.ok(
    box.x >= 0 &&
      box.y >= 0 &&
      box.x + box.width <= 360 &&
      box.y + box.height <= 600,
    JSON.stringify(box),
  );
  await page.keyboard.press("Escape");
  await tooltip.waitFor({ state: "hidden" });
  await page.getByRole("menuitem", { name: "Browse", exact: true }).hover();
  await tooltip.waitFor();
  await page.close();
});

test("submenu navigation preserves parent state and width while keeping choices live", async () => {
  const page = await fixture();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const trigger = page.getByRole("button", {
    name: "Open settings pages",
    exact: true,
  });
  await trigger.click();
  const popover = page.getByRole("dialog", {
    name: "Settings pages",
    exact: true,
  });
  const input = page.getByRole("textbox", {
    name: "Settings filter",
    exact: true,
  });
  await input.fill("keep my search");
  const unavailable = page.getByRole("menuitem", {
    name: "Unavailable Offline",
    exact: true,
  });
  for (const dark of [false, true]) {
    await page.evaluate(
      (dark) => document.body.classList.toggle("dark-mode", dark),
      dark,
    );
    assert.ok(
      await unavailable.evaluate((element) => {
        const color = getComputedStyle(element)
          .getPropertyValue("--subtle-text")
          .trim();
        return [...element.querySelectorAll("*")].every(
          (child) => getComputedStyle(child).color === color,
        );
      }),
      `Disabled label, trailing text and chevron match in ${dark ? "dark" : "light"} mode`,
    );
  }
  await unavailable.focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  assert.ok(await input.isVisible());
  assert.equal(await page.getByText("Must not open").count(), 0);
  const reasoning = page.getByRole("menuitem", {
    name: "Reasoning High",
    exact: true,
  });
  await reasoning.focus();
  const menu = page.getByRole("menu", { name: "Settings", exact: true });
  const scroll = await menu.evaluate((el) => el.scrollTop);
  const width = (await popover.boundingBox()).width;
  await page.keyboard.press("ArrowRight");
  const high = page.getByRole("menuitemradio", { name: "High", exact: true });
  await high.waitFor();
  assert.ok(await high.evaluate((el) => el === document.activeElement));
  assert.equal((await popover.boundingBox()).width, width);
  assert.equal(await input.isVisible(), false);
  assert.ok(
    await page
      .getByLabel("Settings filter", { exact: true })
      .evaluate((el) => !!el.closest("[inert]")),
  );
  const low = page.getByRole("menuitemradio", { name: "Low", exact: true });
  await low.click();
  assert.equal(await low.getAttribute("aria-checked"), "true");
  assert.equal(await high.getAttribute("aria-checked"), "false");
  await page.keyboard.press("ArrowLeft");
  const updated = page.getByRole("menuitem", {
    name: "Reasoning Low",
    exact: true,
  });
  await updated.waitFor();
  assert.ok(await updated.evaluate((el) => el === document.activeElement));
  assert.equal(await input.inputValue(), "keep my search");
  assert.equal(await menu.evaluate((el) => el.scrollTop), scroll);
  await page
    .getByRole("menuitem", { name: "Provider One", exact: true })
    .click();
  await page.getByRole("menuitem", { name: "Two", exact: true }).click();
  const provider = page.getByRole("menuitem", {
    name: "Provider Two",
    exact: true,
  });
  await provider.waitFor();
  assert.ok(await provider.evaluate((el) => el === document.activeElement));
  assert.ok(await popover.isVisible());
  await updated.click();
  await page.keyboard.press("Shift+Tab");
  assert.ok(
    await page
      .getByRole("button", { name: "Back from Reasoning", exact: true })
      .evaluate((el) => el === document.activeElement),
  );
  await page.keyboard.press("Tab");
  assert.ok(await low.evaluate((el) => el === document.activeElement));
  await high.click();
  await popover.waitFor({ state: "hidden" });
  assert.ok(await trigger.evaluate((el) => el === document.activeElement));
  assert.deepEqual(errors, []);
  await page.close();
});

test("submenu forms keep editing keys and nested overlays dismiss before pages", async () => {
  const page = await fixture();
  const trigger = page.getByRole("button", {
    name: "Open settings pages",
    exact: true,
  });
  await trigger.click();
  const popover = page.getByRole("dialog", {
    name: "Settings pages",
    exact: true,
  });
  const advanced = page.getByRole("menuitem", {
    name: "Advanced",
    exact: true,
  });
  await advanced.click();
  const custom = page.getByRole("menuitem", {
    name: "Custom model",
    exact: true,
  });
  await custom.press("ArrowRight");
  const input = page.getByRole("textbox", {
    name: "Custom model ID",
    exact: true,
  });
  await input.waitFor();
  assert.ok(await input.evaluate((el) => el === document.activeElement));
  assert.equal(await input.evaluate((el) => el.closest('[role="menu"]')), null);
  assert.deepEqual(
    await input.evaluate((element) => [
      getComputedStyle(element).paddingRight,
      getComputedStyle(element.labels[0]).paddingRight,
    ]),
    ["0px", "14px"],
  );
  await popover.getByRole("button", { name: "Done", exact: true }).focus();
  await popover.locator("label", { hasText: "Custom model ID" }).click();
  assert.ok(await input.evaluate((el) => el === document.activeElement));
  await input.fill("my-model");
  await input.press("ArrowLeft");
  assert.equal(await input.evaluate((el) => el.selectionStart), 7);
  await input.press("ArrowRight");
  assert.equal(await input.evaluate((el) => el.selectionStart), 8);
  await page
    .getByRole("button", { name: "Model connection", exact: true })
    .click();
  const choices = page.getByRole("listbox", {
    name: "Model connection",
    exact: true,
  });
  await choices.waitFor();
  await page.keyboard.press("Escape");
  await choices.waitFor({ state: "hidden" });
  assert.ok(await input.isVisible());
  await page.keyboard.press("Escape");
  await custom.waitFor();
  assert.ok(await custom.evaluate((el) => el === document.activeElement));
  const about = page.getByRole("menuitem", { name: "About", exact: true });
  await about.focus();
  const tooltip = page.getByRole("tooltip");
  await tooltip.waitFor();
  await page.keyboard.press("Escape");
  await tooltip.waitFor({ state: "hidden" });
  assert.ok(await custom.isVisible());
  await page
    .getByRole("button", { name: "Back from Advanced", exact: true })
    .click();
  assert.ok(await advanced.evaluate((el) => el === document.activeElement));
  await advanced.click();
  await custom.click();
  assert.equal(await input.inputValue(), "my-model");
  await page
    .getByRole("button", { name: "Back from Custom model", exact: true })
    .press("ArrowLeft");
  await custom.waitFor();
  await page.keyboard.press("Escape");
  await advanced.waitFor();
  await page.keyboard.press("Escape");
  await popover.waitFor({ state: "hidden" });
  assert.ok(await trigger.evaluate((el) => el === document.activeElement));
  await page.close();
});
