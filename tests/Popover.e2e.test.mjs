import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { after, before, test } from "node:test";
import { chromium } from "playwright-core";

const port = 3211;
let origin = process.env.TEST_ORIGIN ?? "http://127.0.0.1:3000";
let browser;
let server;

async function serverIsReady() {
  try {
    return (await fetch(`${origin}/Popover`)).ok;
  } catch {
    return false;
  }
}

before(async () => {
  if (!(await serverIsReady())) {
    origin = `http://127.0.0.1:${port}`;
    server = spawn(
      "./node_modules/.bin/next",
      ["dev", "docs", "-p", String(port)],
      { stdio: "ignore" },
    );

    for (
      let attempt = 0;
      attempt < 120 && !(await serverIsReady());
      attempt++
    ) {
      if (attempt === 119) {
        throw new Error("Docs server did not start");
      }
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  browser = await chromium.launch({ channel: "chrome", headless: true });
});

after(async () => {
  await browser?.close();
  server?.kill("SIGTERM");
});

test("popover can be reopened after it closes", async () => {
  const page = await browser.newPage();
  await page.goto(`${origin}/Popover`);

  const trigger = page.getByRole("button", { name: "Show Options" }).first();
  const dialog = page.locator("dialog").filter({
    has: page.getByRole("button", { name: "Edit" }),
  });

  await trigger.click();
  await dialog.waitFor({ state: "visible" });

  await page.getByRole("button", { name: "Edit" }).first().click();
  await dialog.waitFor({ state: "hidden" });

  await trigger.click();
  await dialog.waitFor({ state: "visible" });
  assert.equal(await dialog.getAttribute("open"), "");

  await page.close();
});
