import { Button } from "./Button";
import { IconType } from "./IconType";
import { JSS, cssVar } from "./jss";
import { Row } from "./Row";
import { useNavigation } from "./useNavigation";

export type ButtonGroupValue = string | number;

export type ButtonGroupOption<Value extends ButtonGroupValue> = {
  value: Value;
  label: string;
  icon?: IconType;
};

export interface ButtonGroupProps<Value extends ButtonGroupValue> {
  label: string;
  options: ReadonlyArray<ButtonGroupOption<Value>>;
  value: Value;
  onValueChange: (value: NoInfer<Value>) => void;
  disabled?: boolean;
  jss?: JSS;
}

export function ButtonGroup<Value extends ButtonGroupValue>({
  label,
  options,
  value,
  onValueChange,
  disabled = false,
  jss,
}: ButtonGroupProps<Value>) {
  const selectedIndex = options.findIndex((option) => option.value === value);
  const rootRef = useNavigation({ initialIndex: selectedIndex });

  return (
    <Row
      ref={rootRef}
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled || undefined}
      jss={[
        {
          width: "fit-content",
          maxWidth: "100%",
        },
        jss,
      ]}
    >
      {options.map((option, index) => {
        const selected = option.value === value;
        const first = index === 0;
        const last = index === options.length - 1;

        return (
          <Button
            key={option.value}
            role="radio"
            aria-checked={selected}
            color={selected ? "primary" : "secondary"}
            bare={!selected}
            disabled={disabled}
            animateInteraction={false}
            icon={option.icon}
            jss={[
              {
                flexGrow: 1,
                borderTopLeftRadius: first ? cssVar("--border-radius-m") : 0,
                borderBottomLeftRadius: first ? cssVar("--border-radius-m") : 0,
                borderTopRightRadius: last ? cssVar("--border-radius-m") : 0,
                borderBottomRightRadius: last ? cssVar("--border-radius-m") : 0,
                boxShadow: "none",
                transition: `background-color ${cssVar("--transition-fast")}, box-shadow ${cssVar("--transition-fast")}`,
              },
              !selected && {
                backgroundColor: cssVar("--hovered-background"),
                ":hover": {
                  backgroundColor: cssVar("--selected-background"),
                },
              },
            ]}
            onFocus={() => {
              if (!disabled && !selected) {
                onValueChange(option.value);
              }
            }}
            onClick={() => {
              if (!selected) {
                onValueChange(option.value);
              }
            }}
          >
            {option.label}
          </Button>
        );
      })}
    </Row>
  );
}
