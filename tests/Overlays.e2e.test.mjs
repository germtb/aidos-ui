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
  await page.route("**/*", (route) => route.abort());
  await page.setContent('<div id="root"></div>');
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
