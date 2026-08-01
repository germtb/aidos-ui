import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { after, before, test } from "node:test";
import { chromium } from "playwright-core";

const port = 3213;
let origin = process.env.TEST_ORIGIN ?? "http://127.0.0.1:3000";
let browser;
let server;

async function serverIsReady() {
  try {
    return (await fetch(`${origin}/TimeInput`)).ok;
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
      if (attempt === 119) throw new Error("Docs server did not start");
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  browser = await chromium.launch({ channel: "chrome", headless: true });
});

after(async () => {
  await browser?.close();
  server?.kill("SIGTERM");
});

test("time segments replace naturally and advance focus", async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await page.goto(`${origin}/TimeInput`);

  const field = page.getByRole("group", { name: "Start time" });
  const hour = field.getByRole("textbox", { name: "hour" });
  const minute = field.getByRole("textbox", { name: "minute" });

  await hour.click();
  await page.keyboard.type("09");
  assert.equal(await hour.inputValue(), "09");
  assert.equal(
    await minute.evaluate((element) => document.activeElement === element),
    true,
  );

  await page.keyboard.type("45");
  assert.equal(await minute.inputValue(), "45");
  assert.equal(await page.getByText("09:45", { exact: true }).count(), 1);
  assert.equal(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
    0,
  );

  await page.close();
});

test("time segments validate ranges and fit their placeholders", async () => {
  const page = await browser.newPage();
  await page.goto(`${origin}/TimeInput`);

  const field = page.getByRole("group", { name: "End time" });
  const hour = field.getByRole("textbox", { name: "hour" });
  const minute = field.getByRole("textbox", { name: "minute" });

  assert.equal(
    await minute.evaluate(
      (element) => element.scrollWidth <= element.clientWidth,
    ),
    true,
  );

  await hour.fill("29");
  await minute.fill("99");
  assert.equal(await hour.getAttribute("aria-invalid"), "true");

  await hour.fill("23");
  await minute.fill("59");
  assert.equal(await hour.getAttribute("aria-invalid"), null);

  await page.close();
});
