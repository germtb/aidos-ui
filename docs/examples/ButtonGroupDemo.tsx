import { useState } from "react";

import { ButtonGroup } from "../../src/ButtonGroup";

const options = [
  { value: "list", label: "List", icon: "list" },
  { value: "grid", label: "Grid", icon: "grid-2x2" },
  { value: "columns", label: "Columns", icon: "columns-3" },
] as const;

export function ButtonGroupDemo() {
  const [value, setValue] = useState<(typeof options)[number]["value"]>("list");

  return (
    <ButtonGroup
      label="View"
      options={options}
      value={value}
      onValueChange={setValue}
    />
  );
}
