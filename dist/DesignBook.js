import React, { useContext, useState } from "react";
import { RootView } from "./RootView";
import { ListRow } from "./ListRow";
import { Sublist } from "./Sublist";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { Text } from "./Text";
import { TextPairing } from "./TextPairing";
import { Icon } from "./Icon";
import { TextInput } from "./TextInput";
import { Checkbox } from "./Checkbox";
import { List } from "./List";
import { ListSpacer } from "./ListSpacer";
import { CenteredListRow } from "./CenteredListRow";
import { ListPressableRow } from "./ListPressableRow";
import { Dialog, useDialog } from "./Dialog";
import { Row } from "./Row";
import { DarkModeContext } from "./DarkMode";
import { Popover, PopoverTrigger } from "./Popover";
import { Tooltip } from "./Tooltip";
import { Link } from "./Link";
import { getBackground, withMedia } from "./jss";
import { Calendar } from "./Calendar";
import { Box } from "./Box";
import { Badge } from "./Badge";
function ExampleDialog({ close }) {
  const darkMode = useContext(DarkModeContext);
  return React.createElement(
    Dialog,
    { close: close, label: "Example" },
    React.createElement(
      Row,
      { padding: "medium", align: "center", justify: "space-between" },
      React.createElement(Text, null, "Dark mode"),
      React.createElement(Checkbox, {
        size: "medium",
        checked: darkMode.enabled,
        onClick: () => darkMode.toggle(),
      })
    )
  );
}
export function DesignBook() {
  const dialog = useDialog(
    ({ close }) => React.createElement(ExampleDialog, { close: close }),
    { closeOnOutsideClick: true }
  );
  const [checkbox1, setCheckbox1] = useState(true);
  const [checkbox2, setCheckbox2] = useState(true);
  const [checkbox3, setCheckbox3] = useState(true);
  const [checkbox4, setCheckbox4] = useState(false);
  const [checkbox5, setCheckbox5] = useState(false);
  const [checkbox6, setCheckbox6] = useState(false);
  return React.createElement(
    RootView,
    null,
    React.createElement(
      List,
      { navigation: false, ariaLabel: "Design book" },
      React.createElement(ListSpacer, null),
      React.createElement(
        Sublist,
        { label: "Button", initialState: { collapsed: false } },
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(Button, {
            label: "Positive button",
            color: "positive",
            onClick: () => {
              dialog.open();
            },
          })
        ),
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(
            PopoverTrigger,
            {
              PopoverComponent: ({ close }) => {
                return React.createElement(
                  Popover,
                  { close: close },
                  React.createElement(
                    List,
                    { navigation: false, ariaLabel: "Popover " },
                    React.createElement(ListPressableRow, {
                      gap: "medium",
                      addOn: React.createElement(Icon, {
                        size: "medium",
                        color: "primary",
                        icon: "fa-address-book",
                      }),
                      headline: "Option 1",
                      onClick: () => {},
                    }),
                    React.createElement(ListPressableRow, {
                      gap: "medium",
                      addOn: React.createElement(Icon, {
                        size: "medium",
                        color: "primary",
                        icon: "fa-adjust",
                      }),
                      headline: "Option 2",
                      onClick: () => {},
                      withDivider: false,
                    })
                  )
                );
              },
            },
            ({ toggle }) =>
              React.createElement(Button, {
                style: { position: "relative" },
                label: "Secondary button",
                color: "secondary",
                onClick: () => {
                  toggle(undefined);
                },
              })
          )
        ),
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(
            PopoverTrigger,
            {
              PopoverComponent: ({ close }) => {
                return React.createElement(
                  Popover,
                  { close: close },
                  React.createElement(
                    List,
                    { ariaLabel: "Popover " },
                    React.createElement(ListPressableRow, {
                      gap: "medium",
                      addOn: React.createElement(Icon, {
                        size: "medium",
                        color: "primary",
                        icon: "fa-address-book",
                      }),
                      headline: "Option 1",
                      onClick: () => {},
                    }),
                    React.createElement(ListPressableRow, {
                      gap: "medium",
                      addOn: React.createElement(Icon, {
                        size: "medium",
                        color: "primary",
                        icon: "fa-adjust",
                      }),
                      headline: "Option 2",
                      onClick: () => {},
                      withDivider: false,
                    })
                  )
                );
              },
            },
            ({ toggle }) =>
              React.createElement(Button, {
                label: "Negative button",
                color: "negative",
                onClick: () => {
                  toggle(undefined);
                },
              })
          )
        ),
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(
            Tooltip,
            { content: "Tooltip here" },
            React.createElement(Button, {
              label: "Disabled button",
              color: "positive",
              onClick: () => {},
              disabled: true,
            })
          )
        ),
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(Button, {
            bare: true,
            label: "Bare positive button",
            color: "positive",
            onClick: () => {},
          })
        ),
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(Button, {
            bare: true,
            label: "Bare secondary button",
            color: "secondary",
            onClick: () => {},
          })
        ),
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(Button, {
            bare: true,
            label: "Bare negative button",
            color: "negative",
            onClick: () => {},
          })
        ),
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(Button, {
            bare: true,
            label: "Bare disabled button",
            color: "positive",
            onClick: () => {},
            disabled: true,
          })
        )
      ),
      React.createElement(
        Sublist,
        { label: "Link", initialState: { collapsed: false } },
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(Link, {
            label: "Positive link",
            color: "positive",
            href: "/",
          })
        ),
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(Link, {
            label: "Secondary link",
            color: "secondary",
            href: "/",
          })
        ),
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(
            Tooltip,
            { content: "Tooltip here" },
            React.createElement(Link, {
              label: "Disabled link",
              color: "positive",
              href: "/",
              disabled: true,
            })
          )
        ),
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(Link, {
            bare: true,
            label: "Bare positive Link",
            color: "positive",
            href: "/",
          })
        ),
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(Link, {
            bare: true,
            label: "Bare secondary Link",
            color: "secondary",
            href: "/",
          })
        ),
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(Link, {
            bare: true,
            label: "Bare negative Link",
            color: "negative",
            href: "/",
          })
        ),
        React.createElement(
          CenteredListRow,
          { gap: "medium" },
          React.createElement(Link, {
            bare: true,
            label: "Bare disabled Link",
            color: "positive",
            href: "/",
            disabled: true,
          })
        )
      ),
      React.createElement(
        Sublist,
        { label: "Responsiveness", initialState: { collapsed: false } },
        React.createElement(
          Row,
          {
            padding: "medium",
            jsStyle: withMedia({
              phone: getBackground("negative"),
              tablet: getBackground("divider"),
              laptop: getBackground("highlight"),
              desktop: getBackground("warning"),
            }),
          },
          React.createElement(
            Text,
            null,
            "Background will change with screen size"
          )
        )
      ),
      React.createElement(ListSpacer, null),
      React.createElement(
        Sublist,
        { label: "Icon button", initialState: { collapsed: false } },
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(IconButton, {
            size: "large",
            icon: "fa-check",
            color: "positive",
            onClick: () => {},
          }),
          React.createElement(IconButton, {
            size: "medium",
            icon: "fa-check",
            color: "positive",
            onClick: () => {},
          }),
          React.createElement(IconButton, {
            size: "small",
            icon: "fa-check",
            color: "positive",
            onClick: () => {},
          }),
          React.createElement(IconButton, {
            size: "large",
            icon: "fa-check",
            color: "positive",
            onClick: () => {},
            bare: true,
          }),
          React.createElement(IconButton, {
            size: "medium",
            icon: "fa-check",
            color: "positive",
            onClick: () => {},
            bare: true,
          }),
          React.createElement(IconButton, {
            size: "small",
            icon: "fa-check",
            color: "positive",
            onClick: () => {},
            bare: true,
          })
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(IconButton, {
            size: "large",
            icon: "fa-remove",
            color: "negative",
            onClick: () => {},
          }),
          React.createElement(IconButton, {
            size: "medium",
            icon: "fa-remove",
            color: "negative",
            onClick: () => {},
          }),
          React.createElement(IconButton, {
            size: "small",
            icon: "fa-remove",
            color: "negative",
            onClick: () => {},
          }),
          React.createElement(IconButton, {
            size: "large",
            icon: "fa-remove",
            color: "negative",
            onClick: () => {},
            bare: true,
          }),
          React.createElement(IconButton, {
            size: "medium",
            icon: "fa-remove",
            color: "negative",
            onClick: () => {},
            bare: true,
          }),
          React.createElement(IconButton, {
            size: "small",
            icon: "fa-remove",
            color: "negative",
            onClick: () => {},
            bare: true,
          })
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(IconButton, {
            size: "large",
            icon: "fa-info",
            color: "secondary",
            onClick: () => {},
          }),
          React.createElement(IconButton, {
            size: "medium",
            icon: "fa-info",
            color: "secondary",
            onClick: () => {},
          }),
          React.createElement(IconButton, {
            size: "small",
            icon: "fa-info",
            color: "secondary",
            onClick: () => {},
          }),
          React.createElement(IconButton, {
            size: "large",
            icon: "fa-info",
            color: "secondary",
            onClick: () => {},
            bare: true,
          }),
          React.createElement(IconButton, {
            size: "medium",
            icon: "fa-info",
            color: "secondary",
            onClick: () => {},
            bare: true,
          }),
          React.createElement(IconButton, {
            size: "small",
            icon: "fa-info",
            color: "secondary",
            onClick: () => {},
            bare: true,
          })
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(IconButton, {
            disabled: true,
            size: "large",
            icon: "fa-check",
            color: "positive",
            onClick: () => {},
          }),
          React.createElement(IconButton, {
            disabled: true,
            size: "medium",
            icon: "fa-check",
            color: "positive",
            onClick: () => {},
          }),
          React.createElement(IconButton, {
            disabled: true,
            size: "small",
            icon: "fa-check",
            color: "positive",
            onClick: () => {},
          }),
          React.createElement(IconButton, {
            disabled: true,
            size: "large",
            icon: "fa-check",
            color: "positive",
            onClick: () => {},
            bare: true,
          }),
          React.createElement(IconButton, {
            disabled: true,
            size: "medium",
            icon: "fa-check",
            color: "positive",
            onClick: () => {},
            bare: true,
          }),
          React.createElement(IconButton, {
            disabled: true,
            size: "small",
            icon: "fa-check",
            color: "positive",
            onClick: () => {},
            bare: true,
          })
        )
      ),
      React.createElement(ListSpacer, null),
      React.createElement(
        Sublist,
        {
          label: "Pressable list row",
          initialState: {
            collapsed: false,
          },
        },
        React.createElement(ListPressableRow, {
          onClick: () => {},
          headline: "Headline",
        }),
        React.createElement(ListPressableRow, {
          selected: true,
          onClick: () => {},
          headline: "Selected",
        }),
        React.createElement(ListPressableRow, {
          onClick: () => {},
          headline: "Headline",
          body: "Body",
        }),
        React.createElement(ListPressableRow, {
          onClick: () => {},
          headline: "Disabled",
          body: "Body",
          disabled: true,
        }),
        React.createElement(ListPressableRow, {
          gap: "medium",
          addOn: React.createElement(
            Box,
            { padding: "medium" },
            React.createElement(Icon, {
              size: "medium",
              color: "primary",
              icon: "fa-address-book",
            })
          ),
          headline: "Really long body",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          onClick: () => {},
        })
      ),
      React.createElement(
        Sublist,
        { label: "Text", initialState: { collapsed: false } },
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(
            Text,
            { size: "large", color: "primary" },
            "Primary large"
          ),
          React.createElement(
            Text,
            { size: "medium", color: "primary" },
            "Primary medium"
          ),
          React.createElement(
            Text,
            { size: "small", color: "primary" },
            "Primary small"
          )
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(
            Text,
            { size: "large", color: "secondary" },
            "Secondary large"
          ),
          React.createElement(
            Text,
            { size: "medium", color: "secondary" },
            "Secondary medium"
          ),
          React.createElement(
            Text,
            { size: "small", color: "secondary" },
            "Secondary small"
          )
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(
            Text,
            { size: "large", color: "subtle" },
            "Subtle large"
          ),
          React.createElement(
            Text,
            { size: "medium", color: "subtle" },
            "Subtle medium"
          ),
          React.createElement(
            Text,
            { size: "small", color: "subtle" },
            "Subtle small"
          )
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(
            Text,
            { size: "large", color: "light" },
            "Light large"
          ),
          React.createElement(
            Text,
            { size: "medium", color: "light" },
            "Light medium"
          ),
          React.createElement(
            Text,
            { size: "small", color: "light" },
            "Light small"
          )
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(
            Text,
            { size: "large", color: "highlight" },
            "Highlight large"
          ),
          React.createElement(
            Text,
            { size: "medium", color: "highlight" },
            "Highlight medium"
          ),
          React.createElement(
            Text,
            { size: "small", color: "highlight" },
            "Highlight small"
          )
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(
            Text,
            { size: "large", color: "negative" },
            "Negative large"
          ),
          React.createElement(
            Text,
            { size: "medium", color: "negative" },
            "Negative medium"
          ),
          React.createElement(
            Text,
            { size: "small", color: "negative" },
            "Negative small"
          )
        )
      ),
      React.createElement(ListSpacer, null),
      React.createElement(
        Sublist,
        { initialState: { collapsed: false }, label: "Icon" },
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(Icon, {
            size: "large",
            color: "primary",
            icon: "fa-check",
          }),
          React.createElement(Icon, {
            size: "medium",
            color: "primary",
            icon: "fa-check",
          }),
          React.createElement(Icon, {
            size: "small",
            color: "primary",
            icon: "fa-check",
          })
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(Icon, {
            size: "large",
            color: "secondary",
            icon: "fa-check",
          }),
          React.createElement(Icon, {
            size: "medium",
            color: "secondary",
            icon: "fa-check",
          }),
          React.createElement(Icon, {
            size: "small",
            color: "secondary",
            icon: "fa-check",
          })
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(Icon, {
            size: "large",
            color: "subtle",
            icon: "fa-check",
          }),
          React.createElement(Icon, {
            size: "medium",
            color: "subtle",
            icon: "fa-check",
          }),
          React.createElement(Icon, {
            size: "small",
            color: "subtle",
            icon: "fa-check",
          })
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(Icon, {
            size: "large",
            color: "light",
            icon: "fa-check",
          }),
          React.createElement(Icon, {
            size: "medium",
            color: "light",
            icon: "fa-check",
          }),
          React.createElement(Icon, {
            size: "small",
            color: "light",
            icon: "fa-check",
          })
        )
      ),
      React.createElement(ListSpacer, null),
      React.createElement(
        Sublist,
        { initialState: { collapsed: false }, label: "Text pairing" },
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(TextPairing, { headline: "Headline" })
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(TextPairing, {
            headline: "Headline",
            body: "Body",
          })
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(TextPairing, {
            headline: "Headline",
            body: "Body",
            addOn: React.createElement(Icon, {
              size: "large",
              color: "primary",
              icon: "fa-user",
            }),
          })
        )
      ),
      React.createElement(ListSpacer, null),
      React.createElement(
        Sublist,
        { initialState: { collapsed: false }, label: "Input" },
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(TextInput, {
            value: "",
            placeholder: "Placeholder text input",
            onValueChange: () => {},
          })
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(TextInput, {
            value: "",
            icon: "fa-user",
            placeholder: "Placeholder text input",
            onValueChange: () => {},
          })
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(TextInput, {
            value: "Text input",
            onValueChange: () => {},
          })
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(TextInput, {
            icon: "fa-user",
            value: "Text input",
            onValueChange: () => {},
          })
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(Checkbox, {
            size: "small",
            checked: checkbox1,
            onClick: () => setCheckbox1((x) => !x),
          }),
          React.createElement(Checkbox, {
            size: "medium",
            checked: checkbox2,
            onClick: () => setCheckbox2((x) => !x),
          }),
          React.createElement(Checkbox, {
            size: "large",
            checked: checkbox3,
            onClick: () => setCheckbox3((x) => !x),
          })
        ),
        React.createElement(
          ListRow,
          { padding: "medium", gap: "medium" },
          React.createElement(Checkbox, {
            size: "small",
            checked: checkbox4,
            onClick: () => setCheckbox4((x) => !x),
          }),
          React.createElement(Checkbox, {
            size: "medium",
            checked: checkbox5,
            onClick: () => setCheckbox5((x) => !x),
          }),
          React.createElement(Checkbox, {
            size: "large",
            checked: checkbox6,
            onClick: () => setCheckbox6((x) => !x),
          })
        )
      ),
      React.createElement(ListSpacer, null),
      React.createElement(ListSpacer, null),
      React.createElement(
        Sublist,
        { label: "Calendar" },
        React.createElement(Calendar, {
          date: new Date(),
          header: ({ weekday }) =>
            React.createElement(
              Box,
              null,
              React.createElement(Text, null, weekday)
            ),
          cell: ({ today, date, outOfMonth }) =>
            React.createElement(
              Box,
              { relative: true, style: { opacity: outOfMonth ? 0.2 : 1 } },
              today &&
                React.createElement(Badge, {
                  jsStyle: {
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%) translateX(-75%)",
                    right: "50%",
                  },
                }),
              React.createElement(Text, null, date.getDate())
            ),
        })
      )
    )
  );
}
//# sourceMappingURL=DesignBook.js.map
