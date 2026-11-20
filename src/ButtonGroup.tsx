import { BaseButton } from "./BaseButton";
import { Icon } from "./Icon";
import { IconType } from "./IconType";
import { JSS, cssVar } from "./jss";
import { Row } from "./Row";
import {
  segmentedGroupJSS,
  segmentedItemJSS,
  segmentedPadding,
} from "./segmentedStyles";
import { Text } from "./Text";
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
      gap="xsmall"
      jss={[segmentedGroupJSS, jss]}
    >
      {options.map((option) => {
        const selected = option.value === value;
        const color = disabled ? "subtle" : selected ? "primary" : "secondary";
        return (
          <BaseButton
            key={option.value}
            role="radio"
            aria-checked={selected}
            color="secondary"
            bare
            disabled={disabled}
            animateInteraction={false}
            padding={segmentedPadding}
            jss={[
              { minWidth: 0, flexGrow: 1, gap: cssVar("--spacing-s") },
              segmentedItemJSS(selected),
            ]}
            onFocus={() => {
              if (!disabled && !selected) onValueChange(option.value);
            }}
            onClick={() => {
              if (!selected) onValueChange(option.value);
            }}
          >
            {option.icon && (
              <Icon
                icon={option.icon}
                size="medium"
                color={color}
                jss={{ flexShrink: 0 }}
              />
            )}
            <Text size="medium" color={color} jss={{ minWidth: 0 }}>
              {option.label}
            </Text>
          </BaseButton>
        );
      })}
    </Row>
  );
}
