import { TextColor } from "./jss";
export interface DatePickerProps {
    id: string;
    label: string;
    date: Date;
    color?: TextColor;
    min?: string;
    max?: string;
    onDateChange: (date: Date) => void;
}
export declare function DatePicker({ id, label, color, date, onDateChange, }: DatePickerProps): import("react/jsx-runtime").JSX.Element;
