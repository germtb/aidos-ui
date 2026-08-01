import { useState } from "react";

import { Row } from "../../src/Row";
import { Span } from "../../src/Text";
import { Toggle } from "../../src/Toggle";

export function ToggleDemo() {
  const [notifications, setNotifications] = useState(false);

  return (
    <Row gap="medium" align="center">
      <Toggle
        label="Notifications"
        value={notifications}
        onValueChange={setNotifications}
        onIcon="bell-ring"
        offIcon="bell-off"
      />
      <Span color="secondary">
        Notifications {notifications ? "on" : "off"}
      </Span>
    </Row>
  );
}
