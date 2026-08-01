import React, { useEffect, useId, useMemo, useRef, useState } from "react";

import { BaseView } from "./BaseView";
import { Button } from "./Button";
import { Column } from "./Column";
import { IconButton } from "./IconButton";
import { InputFrame } from "./InputFrame";
import { NumericInputSegment } from "./NumericInputSegment";
import { Popover, PopoverTrigger } from "./Popover";
import { Row } from "./Row";
import { Label, Span } from "./Text";
import { JSS, cssVar } from "./jss";
import { formatDateInputValue } from "./dateInputValue";

type DatePart = "day" | "month" | "year";
type DateSegments = Record<DatePart, string>;

export interface DateInputProps {
  date: Date | null;
  onDateChange: (date: Date | null) => void;
  label?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  id?: string;
  name?: string;
  locale?: string;
  min?: Date;
  max?: Date;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  jss?: JSS;
}

const partLength: Record<DatePart, number> = {
  day: 2,
  month: 2,
  year: 4,
};

const partPlaceholder: Record<DatePart, string> = {
  day: "DD",
  month: "MM",
  year: "YYYY",
};

const emptySegments = (): DateSegments => ({ day: "", month: "", year: "" });

function getSegments(date: Date | null): DateSegments {
  if (date == null) return emptySegments();

  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: String(date.getMonth() + 1).padStart(2, "0"),
    year: String(date.getFullYear()).padStart(4, "0"),
  };
}

function localDate(year: number, month: number, day: number): Date {
  const date = new Date(0, month - 1, day, 12);
  date.setFullYear(year);
  return date;
}

function startOfDay(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
}

function isWithinRange(date: Date, min?: Date, max?: Date): boolean {
  const value = startOfDay(date);
  return (
    (min == null || value >= startOfDay(min)) &&
    (max == null || value <= startOfDay(max))
  );
}

function parseSegments(
  segments: DateSegments,
  min?: Date,
  max?: Date,
): Date | null {
  if (
    Object.entries(segments).some(
      ([part, value]) => value.length !== partLength[part as DatePart],
    )
  ) {
    return null;
  }

  const year = Number(segments.year);
  const month = Number(segments.month);
  const day = Number(segments.day);
  const date = localDate(year, month, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day ||
    !isWithinRange(date, min, max)
  ) {
    return null;
  }

  return date;
}

function dateKey(date: Date): string {
  return formatDateInputValue(date);
}

function addDays(date: Date, days: number): Date {
  return localDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate() + days,
  );
}

function addMonths(date: Date, months: number): Date {
  return localDate(date.getFullYear(), date.getMonth() + 1 + months, 1);
}

function shiftMonths(date: Date, months: number): Date {
  const month = addMonths(date, months);
  const lastDay = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  return localDate(
    month.getFullYear(),
    month.getMonth() + 1,
    Math.min(date.getDate(), lastDay),
  );
}

function firstDayOfWeek(locale?: string): number {
  try {
    const localeInfo = new Intl.Locale(locale);
    const weekInfo =
      // Modern engines expose getWeekInfo(); older ones used weekInfo.
      (
        localeInfo as Intl.Locale & { getWeekInfo?: () => { firstDay: number } }
      ).getWeekInfo?.() ??
      (localeInfo as Intl.Locale & { weekInfo?: { firstDay: number } })
        .weekInfo;
    return (weekInfo?.firstDay ?? 1) % 7;
  } catch {
    return 1;
  }
}

function DateCalendar({
  date,
  locale,
  min,
  max,
  onSelect,
}: {
  date: Date | null;
  locale?: string;
  min?: Date;
  max?: Date;
  onSelect: (date: Date) => void;
}) {
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(() =>
    localDate((date ?? today).getFullYear(), (date ?? today).getMonth() + 1, 1),
  );
  const gridRef = useRef<HTMLElement | null>(null);
  const pendingFocus = useRef<string | null>(null);
  const headingId = useId();
  const weekStart = firstDayOfWeek(locale);
  const weekdayFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "short" }),
    [locale],
  );
  const fullWeekdayFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "long" }),
    [locale],
  );
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [locale],
  );
  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" }),
    [locale],
  );

  const firstOfMonth = localDate(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    1,
  );
  const offset = (firstOfMonth.getDay() - weekStart + 7) % 7;
  const firstGridDate = addDays(firstOfMonth, -offset);
  const days = Array.from({ length: 42 }, (_, index) =>
    addDays(firstGridDate, index),
  );
  const weekdays = Array.from({ length: 7 }, (_, index) =>
    weekdayFormatter.format(
      addDays(new Date(2024, 0, 7, 12), weekStart + index),
    ),
  );

  useEffect(() => {
    if (pendingFocus.current == null) return;
    const key = pendingFocus.current;
    pendingFocus.current = null;
    requestAnimationFrame(() => {
      gridRef.current
        ?.querySelector<HTMLElement>(`[data-calendar-date="${key}"]`)
        ?.focus();
    });
  }, [visibleMonth]);

  const focusDate = (nextDate: Date) => {
    if (!isWithinRange(nextDate, min, max)) return;

    const key = dateKey(nextDate);
    const inVisibleMonth =
      nextDate.getFullYear() === visibleMonth.getFullYear() &&
      nextDate.getMonth() === visibleMonth.getMonth();

    if (inVisibleMonth) {
      const element = gridRef.current?.querySelector<HTMLElement>(
        `[data-calendar-date="${key}"]`,
      );
      if (element) {
        element.focus();
        return;
      }
    }

    pendingFocus.current = key;
    setVisibleMonth(
      localDate(nextDate.getFullYear(), nextDate.getMonth() + 1, 1),
    );
  };

  const changeMonth = (amount: number) => {
    const nextMonth = addMonths(visibleMonth, amount);
    const preferredDay = date?.getDate() ?? today.getDate();
    const lastDay = new Date(
      nextMonth.getFullYear(),
      nextMonth.getMonth() + 1,
      0,
    ).getDate();
    const nextFocus = localDate(
      nextMonth.getFullYear(),
      nextMonth.getMonth() + 1,
      Math.min(preferredDay, lastDay),
    );
    pendingFocus.current = dateKey(nextFocus);
    setVisibleMonth(nextMonth);
  };

  const onGridKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const target = (event.target as HTMLElement).dataset.calendarDate;
    if (target == null) return;

    const [year, month, day] = target.split("-").map(Number);
    const focusedDate = localDate(year, month, day);
    let nextDate: Date | null = null;

    switch (event.key) {
      case "ArrowLeft":
        nextDate = addDays(focusedDate, -1);
        break;
      case "ArrowRight":
        nextDate = addDays(focusedDate, 1);
        break;
      case "ArrowUp":
        nextDate = addDays(focusedDate, -7);
        break;
      case "ArrowDown":
        nextDate = addDays(focusedDate, 7);
        break;
      case "Home":
        nextDate = addDays(
          focusedDate,
          -((focusedDate.getDay() - weekStart + 7) % 7),
        );
        break;
      case "End":
        nextDate = addDays(
          focusedDate,
          6 - ((focusedDate.getDay() - weekStart + 7) % 7),
        );
        break;
      case "PageUp":
        nextDate = shiftMonths(focusedDate, event.shiftKey ? -12 : -1);
        break;
      case "PageDown":
        nextDate = shiftMonths(focusedDate, event.shiftKey ? 12 : 1);
        break;
    }

    if (nextDate != null) {
      event.preventDefault();
      event.stopPropagation();
      focusDate(nextDate);
    }
  };

  return (
    <Column gap="small" jss={{ width: 280 }}>
      <Row align="center" justify="space-between">
        <IconButton
          bare
          color="secondary"
          icon="chevron-left"
          aria-label="Previous month"
          onClick={() => changeMonth(-1)}
        />
        <BaseView id={headingId} aria-live="polite">
          <Span bold>{monthFormatter.format(visibleMonth)}</Span>
        </BaseView>
        <IconButton
          bare
          color="secondary"
          icon="chevron-right"
          aria-label="Next month"
          onClick={() => changeMonth(1)}
        />
      </Row>
      <BaseView
        ref={gridRef}
        role="grid"
        aria-labelledby={headingId}
        onKeyDown={onGridKeyDown}
      >
        <Row role="row">
          {weekdays.map((weekday, index) => (
            <BaseView
              key={`${weekday}-${index}`}
              role="columnheader"
              aria-label={fullWeekdayFormatter.format(
                addDays(new Date(2024, 0, 7, 12), weekStart + index),
              )}
              jss={{ width: 40, textAlign: "center" }}
            >
              <Span size="small" color="secondary">
                {weekday}
              </Span>
            </BaseView>
          ))}
        </Row>
        {Array.from({ length: 6 }, (_, week) => (
          <Row role="row" key={week}>
            {days.slice(week * 7, week * 7 + 7).map((day) => {
              const selected = date != null && dateKey(day) === dateKey(date);
              const current = dateKey(day) === dateKey(today);
              const outsideMonth = day.getMonth() !== visibleMonth.getMonth();
              const unavailable = !isWithinRange(day, min, max);

              return (
                <Button
                  key={dateKey(day)}
                  role="gridcell"
                  data-calendar-date={dateKey(day)}
                  data-autofocus={selected || (date == null && current)}
                  aria-label={dateFormatter.format(day)}
                  aria-selected={selected}
                  tabIndex={selected || (date == null && current) ? 0 : -1}
                  disabled={unavailable}
                  bare={!selected}
                  color={selected ? "primary" : "secondary"}
                  jss={{
                    width: 40,
                    height: 36,
                    padding: 0,
                    borderRadius: cssVar("--border-radius-m"),
                    opacity: outsideMonth ? 0.45 : 1,
                    outline:
                      current && !selected
                        ? `1px solid ${cssVar("--outline")}`
                        : "none",
                    outlineOffset: -3,
                  }}
                  onClick={() => onSelect(day)}
                >
                  {String(day.getDate())}
                </Button>
              );
            })}
          </Row>
        ))}
      </BaseView>
    </Column>
  );
}

export const DateInput = React.forwardRef(function DateInput(
  {
    date,
    onDateChange,
    label,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    id: providedId,
    name,
    locale = "en-GB",
    min,
    max,
    disabled = false,
    required = false,
    readOnly = false,
    autoFocus = false,
    jss,
  }: DateInputProps,
  ref?: React.Ref<HTMLInputElement>,
) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const labelId = `${id}-label`;
  const dateTimestamp = date?.getTime() ?? null;
  const [segments, setSegments] = useState(() => getSegments(date));
  const [draftInvalid, setDraftInvalid] = useState(false);
  const [syncedDateTimestamp, setSyncedDateTimestamp] = useState(dateTimestamp);
  const inputRefs = useRef<Partial<Record<DatePart, HTMLInputElement>>>({});
  const parts = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .formatToParts(new Date(2000, 10, 22))
        .filter((part) =>
          ["day", "month", "year", "literal"].includes(part.type),
        ),
    [locale],
  );
  const orderedParts = parts.filter(
    (part): part is Intl.DateTimeFormatPart & { type: DatePart } =>
      part.type === "day" || part.type === "month" || part.type === "year",
  );

  if (dateTimestamp !== syncedDateTimestamp) {
    setSyncedDateTimestamp(dateTimestamp);
    setSegments(getSegments(date));
    setDraftInvalid(false);
  }

  const updateSegment = (part: DatePart, rawValue: string) => {
    const value = rawValue.replace(/\D/g, "").slice(0, partLength[part]);
    const next = { ...segments, [part]: value };
    setSegments(next);
    const complete = Object.entries(next).every(
      ([key, segment]) => segment.length === partLength[key as DatePart],
    );

    if (Object.values(next).every((segment) => segment === "")) {
      setDraftInvalid(false);
      onDateChange(null);
      return;
    }

    const parsed = parseSegments(next, min, max);
    setDraftInvalid(complete && parsed == null);
    if (parsed != null) onDateChange(parsed);
  };

  const field = (
    <PopoverTrigger<object>
      ariaLabel="Choose date"
      grow
      jss={[{ width: "100%" }, jss]}
      jssDialog={{ left: "auto", right: 0 }}
      PopoverComponent={({ close }) => (
        <Popover close={close}>
          <DateCalendar
            date={date}
            locale={locale}
            min={min}
            max={max}
            onSelect={(nextDate) => {
              setSegments(getSegments(nextDate));
              setDraftInvalid(false);
              onDateChange(nextDate);
              close();
            }}
          />
        </Popover>
      )}
    >
      {({ toggle, expanded }) => (
        <InputFrame
          align="center"
          role="group"
          aria-labelledby={label ? labelId : undefined}
          aria-label={label ? undefined : (ariaLabel ?? "Date")}
          aria-describedby={ariaDescribedBy}
        >
          <Row align="center" padding={["none", "medium"]} grow>
            {parts.map((part, index) => {
              if (part.type === "literal") {
                return (
                  <Span key={`${part.type}-${index}`} color="secondary">
                    {part.value.trim() || "/"}
                  </Span>
                );
              }

              if (
                part.type !== "day" &&
                part.type !== "month" &&
                part.type !== "year"
              ) {
                return null;
              }

              const datePart = part.type;
              const firstPart = orderedParts[0]?.type === datePart;
              const partIndex = orderedParts.findIndex(
                (item) => item.type === datePart,
              );
              return (
                <NumericInputSegment
                  key={datePart}
                  id={firstPart ? id : `${id}-${datePart}`}
                  ref={(element) => {
                    inputRefs.current[datePart] = element;
                    if (firstPart) {
                      if (typeof ref === "function") ref(element);
                      else if (ref) ref.current = element;
                    }
                  }}
                  value={segments[datePart]}
                  label={datePart}
                  placeholder={partPlaceholder[datePart]}
                  length={partLength[datePart]}
                  width={datePart === "year" ? "6ch" : "4ch"}
                  disabled={disabled}
                  readOnly={readOnly}
                  required={required}
                  autoFocus={autoFocus && firstPart}
                  invalid={ariaInvalid || draftInvalid}
                  onValueChange={(value) => updateSegment(datePart, value)}
                  onComplete={() =>
                    inputRefs.current[
                      orderedParts[partIndex + 1]?.type
                    ]?.focus()
                  }
                  onPrevious={() =>
                    inputRefs.current[
                      orderedParts[partIndex - 1]?.type
                    ]?.focus()
                  }
                  onNext={() =>
                    inputRefs.current[
                      orderedParts[partIndex + 1]?.type
                    ]?.focus()
                  }
                />
              );
            })}
          </Row>
          <IconButton
            bare
            color="secondary"
            icon="calendar-days"
            disabled={disabled || readOnly}
            aria-label={
              date == null
                ? "Choose date"
                : `Change date, ${date.toLocaleDateString(locale)}`
            }
            aria-haspopup="dialog"
            aria-expanded={expanded}
            onClick={() => toggle({})}
          />
          {name && (
            <input
              type="hidden"
              name={name}
              value={date == null ? "" : formatDateInputValue(date)}
            />
          )}
        </InputFrame>
      )}
    </PopoverTrigger>
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
