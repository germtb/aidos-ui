import React from "react";
import { DarkModeToggle } from "../../src/DarkMode";
import { Row } from "../../src/Row";
import { Dialog, useDialog } from "../../src/Dialog";
import { Button } from "../../src/Button";
import { Span } from "../../src/Text";

function ExampleDialog({ close }) {
  return (
    <Dialog close={close} label="Example">
      <Row padding="medium" align="center" justify="space-between">
        <Span>Dark mode</Span>
        <DarkModeToggle />
      </Row>
    </Dialog>
  );
}

export function DialogTrigger() {
  const { open } = useDialog<void>(
    ({ close }) => <ExampleDialog close={close} />,
    { closeOnOutsideClick: true }
  );

  return (
    <Button color="primary" onClick={() => open()}>
      Show dialog
    </Button>
  );
}
