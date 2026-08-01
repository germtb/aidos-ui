import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { after, before, test } from "node:test";
import { chromium } from "playwright-core";

const port = 3212;
let origin = process.env.TEST_ORIGIN ?? "http://127.0.0.1:3000";
let browser;
let server;

async function serverIsReady() {
  try {
    return (await fetch(`${origin}/DateInput`)).ok;
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

test("date input supports calendar navigation and restores focus", async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await page.goto(`${origin}/DateInput`);

  const field = page.getByRole("group", { name: "Start date" });
  const segmentLabels = await field
    .locator("input:not([type=hidden])")
    .evaluateAll((inputs) =>
      inputs.map((input) => input.getAttribute("aria-label")),
    );
  assert.deepEqual(segmentLabels, ["day", "month", "year"]);

  const trigger = field.getByRole("button", { name: /Change date/ });
  await trigger.click();
  const selected = page.locator('[role="gridcell"][aria-selected="true"]');
  assert.equal(
    await selected.getAttribute("aria-label"),
    "Saturday, 1 August 2026",
  );

  await selected.press("PageDown");
  assert.equal(
    await page.locator(":focus").getAttribute("aria-label"),
    "Tuesday, 1 September 2026",
  );

  await page.keyboard.press("Escape");
  assert.equal(
    await trigger.evaluate((element) => document.activeElement === element),
    true,
  );
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

test("typed dates expose invalid state and commit once valid", async () => {
  const page = await browser.newPage();
  await page.goto(`${origin}/DateInput`);

  const field = page.getByRole("group", { name: "Due date" });
  const day = field.getByRole("textbox", { name: "day" });
  const month = field.getByRole("textbox", { name: "month" });
  const year = field.getByRole("textbox", { name: "year" });

  await day.fill("31");
  await month.fill("02");
  await year.fill("2026");
  assert.equal(await day.getAttribute("aria-invalid"), "true");

  await day.fill("15");
  assert.equal(await day.getAttribute("aria-invalid"), null);
  assert.equal(
    await field.getByRole("button").getAttribute("aria-label"),
    "Change date, 15/02/2026",
  );

  await page.close();
});

test("typing normally replaces a complete segment", async () => {
  const page = await browser.newPage();
  await page.goto(`${origin}/DateInput`);

  const field = page.getByRole("group", { name: "Start date" });
  const day = field.getByRole("textbox", { name: "day" });
  await day.click();
  await page.keyboard.type("15");

  assert.equal(await day.inputValue(), "15");
  assert.equal(
    await field.getByRole("button").getAttribute("aria-label"),
    "Change date, 15/08/2026",
  );

  const emptyField = page.getByRole("group", { name: "Due date" });
  for (const input of await emptyField.getByRole("textbox").all()) {
    assert.equal(
      await input.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
      true,
    );
  }

  await page.close();
});
