const pad = (value: number) => value.toString().padStart(2, "0");

export function formatDateInputValue(date: Date): string {
  return `${date.getFullYear().toString().padStart(4, "0")}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}`;
}

export function parseDateInputValue(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDatetimeInputValue(date: Date): string {
  return `${formatDateInputValue(date)}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}`;
}

export function parseDatetimeInputValue(value: string): Date {
  const [date, time] = value.split("T");
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute);
}

export function formatTimeInputValue(date: Date): string {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
