import React from "react";
import { DarkModeToggle } from "../DarkMode";
import { Row } from "../Row";
import { Dialog, useDialog } from "../Dialog";
import { Button } from "../Button";
import { Span } from "../Text";

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
    <Button label="Show dialog" color={"positive"} onClick={() => open()} />
  );
}
