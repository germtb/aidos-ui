import { Button } from "./Button";
import { Column } from "./Column";
import { getInteractableListItemJSS } from "./Interactable";
import { JSS } from "./jss";
import { Popover, PopoverTrigger } from "./Popover";
import { useNavigation } from "./useNavigation";

export type SelectValue = string | number;

export type SelectOption<Value extends SelectValue> = {
  value: Value;
  label: string;
};

export interface SelectProps<Value extends SelectValue> {
  label: string;
  options: ReadonlyArray<SelectOption<Value>>;
  value: Value;
  onValueChange: (value: NoInfer<Value>) => void;
  disabled?: boolean;
  jss?: JSS;
  jssButton?: JSS;
}

export function Select<Value extends SelectValue>({
  label,
  options,
  value,
  onValueChange,
  disabled = false,
  jss,
  jssButton,
}: SelectProps<Value>) {
  const selectedOption = options.find((option) => option.value === value);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const optionsRef = useNavigation({
    autofocus: true,
    initialIndex: selectedIndex,
  });

  return (
    <PopoverTrigger<object>
      ariaLabel={label}
      jss={[{ minWidth: 220 }, jss]}
      PopoverComponent={({ close }) => (
        <Popover close={close}>
          <Column
            ref={optionsRef}
            role="listbox"
            aria-label={label}
            jss={{ width: "100%" }}
          >
            {options.map((option) => {
              const selected = option.value === value;

              return (
                <Button
                  key={option.value}
                  bare
                  color="secondary"
                  role="option"
                  aria-selected={selected}
                  icon={selected ? "check" : undefined}
                  iconPosition="right"
                  justify={selected ? "space-between" : "flex-start"}
                  jss={[
                    getInteractableListItemJSS({ selected }),
                    { width: "100%" },
                  ]}
                  onClick={() => {
                    onValueChange(option.value);
                    close();
                  }}
                >
                  {option.label}
                </Button>
              );
            })}
          </Column>
        </Popover>
      )}
    >
      {({ toggle, expanded }) => (
        <Button
          color="secondary"
          disabled={disabled}
          aria-label={label}
          aria-haspopup="listbox"
          aria-expanded={expanded}
          icon="chevron-down"
          iconPosition="right"
          justify="space-between"
          jss={[{ width: "100%" }, jssButton]}
          onClick={() => toggle({})}
        >
          {selectedOption?.label ?? "Select"}
        </Button>
      )}
    </PopoverTrigger>
  );
}
