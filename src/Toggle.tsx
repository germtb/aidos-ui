import { IconButton, IconButtonProps } from "./IconButton";
import { IconType } from "./IconType";

export interface ToggleProps extends Omit<
  IconButtonProps,
  "aria-label" | "bare" | "color" | "icon" | "label" | "onClick" | "value"
> {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  onIcon: IconType;
  offIcon: IconType;
  bare?: boolean;
}

export function Toggle({
  label,
  value,
  onValueChange,
  onIcon,
  offIcon,
  bare = false,
  ...buttonProps
}: ToggleProps) {
  return (
    <IconButton
      {...buttonProps}
      aria-label={label}
      aria-pressed={value}
      bare={bare}
      color={bare ? "secondary" : value ? "primary" : "secondary"}
      icon={value ? onIcon : offIcon}
      onClick={() => onValueChange(!value)}
    />
  );
}
