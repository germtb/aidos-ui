import React, { useId, useRef, useState } from "react";

import { Column } from "./Column";
import { Icon } from "./Icon";
import { InputFrame } from "./InputFrame";
import { NumericInputSegment } from "./NumericInputSegment";
import { Row } from "./Row";
import { Label, Span } from "./Text";
import { JSS } from "./jss";
import { formatTimeInputValue } from "./dateInputValue";

type TimePart = "hour" | "minute";
type TimeSegments = Record<TimePart, string>;

export const timeFormatter = Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export interface TimeInputProps {
  time: Date | null;
  onTimeChange: (time: Date | null) => void;
  label?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  jss?: JSS;
}

function getSegments(time: Date | null): TimeSegments {
  if (time == null) return { hour: "", minute: "" };
  return {
    hour: String(time.getHours()).padStart(2, "0"),
    minute: String(time.getMinutes()).padStart(2, "0"),
  };
}

function parseSegments(segments: TimeSegments, base: Date | null): Date | null {
  if (segments.hour.length !== 2 || segments.minute.length !== 2) return null;

  const hour = Number(segments.hour);
  const minute = Number(segments.minute);
  if (hour > 23 || minute > 59) return null;

  const date = base ?? new Date();
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hour,
    minute,
  );
}

export const TimeInput = React.forwardRef(function TimeInput(
  {
    time,
    onTimeChange,
    label,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    id: providedId,
    name,
    disabled = false,
    required = false,
    readOnly = false,
    autoFocus = false,
    jss,
  }: TimeInputProps,
  ref?: React.Ref<HTMLInputElement>,
) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const labelId = `${id}-label`;
  const timeTimestamp = time?.getTime() ?? null;
  const [segments, setSegments] = useState(() => getSegments(time));
  const [draftInvalid, setDraftInvalid] = useState(false);
  const [syncedTimeTimestamp, setSyncedTimeTimestamp] = useState(timeTimestamp);
  const inputRefs = useRef<Partial<Record<TimePart, HTMLInputElement>>>({});

  if (timeTimestamp !== syncedTimeTimestamp) {
    setSyncedTimeTimestamp(timeTimestamp);
    setSegments(getSegments(time));
    setDraftInvalid(false);
  }

  const updateSegment = (part: TimePart, value: string) => {
    const next = { ...segments, [part]: value };
    setSegments(next);

    if (next.hour === "" && next.minute === "") {
      setDraftInvalid(false);
      onTimeChange(null);
      return;
    }

    const complete = next.hour.length === 2 && next.minute.length === 2;
    const parsed = parseSegments(next, time);
    setDraftInvalid(complete && parsed == null);
    if (parsed != null) onTimeChange(parsed);
  };

  const field = (
    <InputFrame
      align="center"
      role="group"
      aria-labelledby={label ? labelId : undefined}
      aria-label={label ? undefined : (ariaLabel ?? "Time")}
      aria-describedby={ariaDescribedBy}
      jss={jss}
    >
      <Row align="center" padding={["none", "medium"]} grow>
        <NumericInputSegment
          id={id}
          ref={(element) => {
            inputRefs.current.hour = element;
            if (typeof ref === "function") ref(element);
            else if (ref) ref.current = element;
          }}
          value={segments.hour}
          label="hour"
          placeholder="HH"
          length={2}
          width="4ch"
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoFocus={autoFocus}
          invalid={ariaInvalid || draftInvalid}
          onValueChange={(value) => updateSegment("hour", value)}
          onComplete={() => inputRefs.current.minute?.focus()}
          onNext={() => inputRefs.current.minute?.focus()}
        />
        <Span color="secondary">:</Span>
        <NumericInputSegment
          id={`${id}-minute`}
          ref={(element) => {
            inputRefs.current.minute = element;
          }}
          value={segments.minute}
          label="minute"
          placeholder="MM"
          length={2}
          width="4ch"
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          invalid={ariaInvalid || draftInvalid}
          onValueChange={(value) => updateSegment("minute", value)}
          onPrevious={() => inputRefs.current.hour?.focus()}
        />
      </Row>
      <Column justify="center" padding={["none", "medium"]}>
        <Icon icon="clock" color="secondary" size="medium" />
      </Column>
      {name && (
        <input
          type="hidden"
          name={name}
          value={time == null ? "" : formatTimeInputValue(time)}
        />
      )}
    </InputFrame>
  );

  if (label == null) return field;

  return (
    <Column gap="small">
      <Label id={labelId} htmlFor={id}>
        {label}
      </Label>
      {field}
    </Column>
  );
});
