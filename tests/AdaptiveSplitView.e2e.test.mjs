import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";
import { chromium } from "playwright-core";
import { build } from "tsup";

let browser;
let directory;

before(async () => {
  directory = await mkdtemp(path.join(os.tmpdir(), "aidos-split-"));
  await build({
    config: false,
    entry: ["tests/fixtures/AdaptiveSplitView.tsx"],
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

test("custom sizing and a header toggle preserve drafts and focus through takeover", async () => {
  const page = await browser.newPage({
    viewport: { width: 1000, height: 600 },
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/*", (route) => route.abort());
  await page.setContent('<!doctype html><div id="root"></div>');
  await page.addScriptTag({
    path: path.join(directory, "AdaptiveSplitView.global.js"),
  });
  const documentDraft = page.getByRole("textbox", { name: "Document draft" });
  const panelDraft = page.getByRole("textbox", { name: "Panel draft" });
  const panel = page.getByRole("complementary", { name: "Inspector" });
  await documentDraft.fill("Keep document");
  await page.getByRole("button", { name: "Show Inspector" }).click();
  await panelDraft.fill("Keep panel");
  assert.equal((await panel.boundingBox()).width, 320);
  assert.equal(await panel.getByText("Custom heading").count(), 1);
  assert.equal(
    await panel.getByRole("button", { name: "Close Inspector" }).count(),
    0,
  );

  await page.getByRole("button", { name: "Equal panes" }).click();
  assert.equal(
    (await panel.boundingBox()).width,
    (await page.locator("[data-aidos-split-content]").boundingBox()).width,
  );
  await documentDraft.focus();
  await page.setViewportSize({ width: 640, height: 600 });
  await page.locator('[data-mode="takeover"]').waitFor();
  assert.equal(await documentDraft.isVisible(), false);
  assert.ok(
    await panel.evaluate((element) => element === document.activeElement),
  );
  await panelDraft.focus();
  await page.keyboard.press("Escape");
  await panel.waitFor({ state: "hidden" });
  assert.ok(
    await documentDraft.evaluate(
      (element) => element === document.activeElement,
    ),
  );
  assert.equal(await documentDraft.inputValue(), "Keep document");

  await page.getByRole("button", { name: "Show Inspector" }).click();
  assert.equal(await panelDraft.inputValue(), "Keep panel");
  await page.getByRole("button", { name: "Hide Inspector" }).click();
  await panel.waitFor({ state: "hidden" });
  assert.ok(
    await page
      .getByRole("button", { name: "Show Inspector" })
      .evaluate((element) => element === document.activeElement),
  );
  await page.close();
});

test("document changes are instant while panel toggles retain motion", async () => {
  const page = await browser.newPage({
    viewport: { width: 1000, height: 600 },
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("**/*", (route) => route.abort());
  await page.setContent('<!doctype html><div id="root"></div>');
  await page.addScriptTag({
    path: path.join(directory, "AdaptiveSplitView.global.js"),
  });
  const panel = page.getByRole("complementary", {
    name: "Inspector",
    includeHidden: true,
  });
  await page
    .getByRole("textbox", { name: "Document draft" })
    .fill("Keep document");
  await page.getByRole("button", { name: "Switch document" }).click();
  assert.deepEqual(
    await panel.evaluate((element) => ({
      grid: getComputedStyle(element.parentElement).transitionProperty,
      panel: getComputedStyle(element).transitionProperty,
      animations:
        element.parentElement.getAnimations().length +
        element.getAnimations().length,
    })),
    { grid: "none", panel: "none", animations: 0 },
  );
  await page.getByRole("textbox", { name: "Panel draft" }).fill("Keep panel");
  await page.getByRole("button", { name: "Hide Inspector" }).click();
  assert.equal(
    await panel.evaluate(
      (element) => getComputedStyle(element.parentElement).transitionProperty,
    ),
    "grid-template-columns",
  );
  await panel.evaluate((element) =>
    Promise.all(
      element.parentElement
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished),
    ),
  );
  await page.getByRole("button", { name: "Show Inspector" }).click();
  assert.equal(
    await page.getByRole("textbox", { name: "Panel draft" }).inputValue(),
    "Keep panel",
  );
  await page.getByRole("button", { name: "Switch document" }).click();
  assert.deepEqual(
    await panel.evaluate((element) => ({
      hidden: element.getAttribute("aria-hidden"),
      animations:
        element.parentElement.getAnimations().length +
        element.getAnimations().length,
    })),
    { hidden: "true", animations: 0 },
  );
  assert.equal(
    await page.getByRole("textbox", { name: "Document draft" }).inputValue(),
    "Keep document",
  );
  await page.close();
});
