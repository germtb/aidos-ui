/// <reference types="react" />
import { TextColor } from "./Palette";
export interface DatePickerProps {
    id: string;
    label: string;
    date: Date;
    color?: TextColor;
    min?: string;
    max?: string;
    onDateChange: (date: Date) => void;
}
export declare function DatePicker({ id, label, color, date, onDateChange, }: DatePickerProps): JSX.Element;
