import { useState } from "react";

import { Button } from "../../src/Button";
import { ButtonGroup } from "../../src/ButtonGroup";
import { Column } from "../../src/Column";

const options = [
  { value: "list", label: "List", icon: "list" },
  { value: "grid", label: "Grid", icon: "grid-2x2" },
  { value: "columns", label: "Columns", icon: "columns-3" },
] as const;

export function ButtonGroupDemo() {
  const [value, setValue] = useState<(typeof options)[number]["value"]>("list");
  const [columns, setColumns] = useState(true);

  return (
    <Column align="flex-start" gap="medium">
      <ButtonGroup
        label="View"
        options={columns ? options : options.slice(0, 2)}
        value={value}
        onValueChange={setValue}
      />
      <Button
        bare
        color="secondary"
        size="small"
        onClick={() => {
          if (columns && value === "columns") setValue("grid");
          setColumns(!columns);
        }}
      >
        {columns ? "Remove Columns" : "Add Columns"}
      </Button>
    </Column>
  );
}
