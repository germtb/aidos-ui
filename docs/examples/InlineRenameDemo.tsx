import React, { useState } from "react";
import { Button, Column, InlineRename, Text } from "../../src";

export function InlineRenameDemo() {
  const [name, setName] = useState("My project");
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <Column gap="medium" align="flex-start">
      <Button
        size="small"
        color="secondary"
        onClick={(event) => setAnchor(event.currentTarget)}
      >
        {name}
      </Button>
      <Text size="small" color="secondary" ellipsis={false}>
        Click the name to edit. Try “Taken” to see validation, or press Escape
        to cancel.
      </Text>
      {anchor && (
        <InlineRename
          anchor={anchor}
          initialValue={name}
          label="Project name"
          onSave={async (value) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            if (value.toLowerCase() === "taken")
              throw new Error("That name is already taken.");
            setName(value);
          }}
          onClose={() => setAnchor(null)}
        />
      )}
    </Column>
  );
}
