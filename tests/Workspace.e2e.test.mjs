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
  directory = await mkdtemp(path.join(os.tmpdir(), "aidos-workspace-"));
  await build({
    config: false,
    entry: ["tests/fixtures/Workspace.tsx"],
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
  const page = await browser.newPage({
    viewport: { width: 1000, height: 600 },
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/*", (route) => route.abort());
  await page.setContent('<!doctype html><div id="root"></div>');
  await page.addScriptTag({
    path: path.join(directory, "Workspace.global.js"),
  });
  return page;
}

test("external visibility and the shell toggle share state without losing drafts", async () => {
  const page = await fixture();
  await page
    .getByRole("textbox", { name: "Navigation draft" })
    .fill("Keep navigation");
  await page
    .getByRole("textbox", { name: "Document draft" })
    .fill("Keep document");
  await page.getByRole("button", { name: "Toggle externally" }).click();
  await page
    .getByRole("textbox", { name: "Navigation draft" })
    .waitFor({ state: "hidden" });
  await page.getByRole("button", { name: "Show navigation" }).click();
  await page.getByText("Navigation open", { exact: true }).waitFor();
  assert.equal(
    await page.getByRole("textbox", { name: "Navigation draft" }).inputValue(),
    "Keep navigation",
  );
  assert.equal(
    await page.getByRole("textbox", { name: "Document draft" }).inputValue(),
    "Keep document",
  );
  await page.getByRole("button", { name: "Select file" }).click();
  assert.equal(
    await page.locator("[data-aidos-workspace]").getAttribute("data-mode"),
    "docked",
  );
  await page.getByRole("button", { name: "Hide navigation" }).click();
  await page.getByText("Navigation closed", { exact: true }).waitFor();
  await page.close();
});

test("controlled floating navigation dismisses and restores focus without reopening on resize", async () => {
  const page = await fixture();
  await page.getByRole("button", { name: "Hide navigation" }).click();
  await page.setViewportSize({ width: 640, height: 600 });
  await page.getByRole("button", { name: "Show navigation" }).click();
  await page.getByRole("dialog", { name: "Files" }).waitFor();
  await page.evaluate(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") event.preventDefault();
    });
  });
  await page.keyboard.press("Escape");
  await page.getByText("Navigation closed", { exact: true }).waitFor();
  assert.ok(
    await page
      .getByRole("button", { name: "Show navigation" })
      .evaluate((button) => button === document.activeElement),
  );
  await page.getByRole("button", { name: "Show navigation" }).click();
  await page.getByRole("button", { name: "Select file" }).click();
  await page.getByText("Navigation closed", { exact: true }).waitFor();
  await page.setViewportSize({ width: 1000, height: 600 });
  assert.equal(
    await page.getByRole("textbox", { name: "Navigation draft" }).isVisible(),
    false,
  );
  await page.close();
});
