import { useState } from "react";

import { Select } from "../../src/Select";

const options = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
] as const;

export function SelectDemo() {
  const [value, setValue] =
    useState<(typeof options)[number]["value"]>("weekly");

  return (
    <Select
      label="Report frequency"
      options={options}
      value={value}
      onValueChange={setValue}
    />
  );
}
