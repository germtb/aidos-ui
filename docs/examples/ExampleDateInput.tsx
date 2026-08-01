import React, { useState } from "react";

import { Column } from "../../src/Column";
import { DateInput } from "../../src/DateInput";
import { Span } from "../../src/Text";

export function ExampleDateInput() {
  const [date, setDate] = useState<Date | null>(new Date(2026, 7, 1));

  return (
    <Column gap="medium" jss={{ maxWidth: 360 }}>
      <DateInput label="Start date" date={date} onDateChange={setDate} />
      <Span color="secondary" size="small">
        {date == null ? "No date selected" : date.toLocaleDateString("en-GB")}
      </Span>
    </Column>
  );
}

export function EmptyDateInput() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DateInput
      aria-label="Due date"
      date={date}
      onDateChange={setDate}
      jss={{ maxWidth: 360 }}
    />
  );
}
