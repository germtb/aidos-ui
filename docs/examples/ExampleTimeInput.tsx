import React, { useState } from "react";

import { Column } from "../../src/Column";
import { TimeInput } from "../../src/TimeInput";
import { Span } from "../../src/Text";

export function ExampleTimeInput() {
  const [time, setTime] = useState<Date | null>(new Date(2026, 7, 1, 14, 30));

  return (
    <Column gap="medium" jss={{ maxWidth: 360 }}>
      <TimeInput label="Start time" time={time} onTimeChange={setTime} />
      <Span color="secondary" size="small">
        {time == null
          ? "No time selected"
          : time.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
      </Span>
    </Column>
  );
}

export function EmptyTimeInput() {
  const [time, setTime] = useState<Date | null>(null);

  return (
    <TimeInput
      aria-label="End time"
      time={time}
      onTimeChange={setTime}
      jss={{ maxWidth: 360 }}
    />
  );
}
