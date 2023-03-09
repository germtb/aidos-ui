import React, { useContext } from "react";
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
import { DarkModeContext } from "./DarkModeStore";
function ExampleDialog({ close }) {
    const darkMode = useContext(DarkModeContext);
    return (React.createElement(Dialog, { close: close, label: "Example" },
        React.createElement(Row, { padding: "medium", align: "center", justify: "space-between" },
            React.createElement(Text, null, "Dark mode"),
            React.createElement(Checkbox, { size: "medium", checked: darkMode.enabled, onValueChange: () => darkMode.toggle() }))));
}
export function DesignBook() {
    const { open } = useDialog(({ close }) => (React.createElement(ExampleDialog, { close: close })));
    return (React.createElement(RootView, null,
        React.createElement(List, { ariaLabel: "Design book" },
            React.createElement(ListSpacer, null),
            React.createElement(Sublist, { label: "Button", initialState: { collapsed: false } },
                React.createElement(CenteredListRow, { gap: "medium" },
                    React.createElement(Button, { label: "Positive button", color: "positive", onPress: () => {
                            open();
                        } })),
                React.createElement(CenteredListRow, { gap: "medium" },
                    React.createElement(Button, { label: "Secondary button", color: "secondary", onPress: () => { } })),
                React.createElement(CenteredListRow, { gap: "medium" },
                    React.createElement(Button, { label: "Negative button", color: "negative", onPress: () => { } })),
                React.createElement(CenteredListRow, { gap: "medium" },
                    React.createElement(Button, { label: "Disabled button", color: "positive", onPress: () => { }, disabled: true })),
                React.createElement(CenteredListRow, { gap: "medium" },
                    React.createElement(Button, { bare: true, label: "Bare positive button", color: "positive", onPress: () => { } })),
                React.createElement(CenteredListRow, { gap: "medium" },
                    React.createElement(Button, { bare: true, label: "Bare secondary button", color: "secondary", onPress: () => { } })),
                React.createElement(CenteredListRow, { gap: "medium" },
                    React.createElement(Button, { bare: true, label: "Bare negative button", color: "negative", onPress: () => { } })),
                React.createElement(CenteredListRow, { gap: "medium" },
                    React.createElement(Button, { bare: true, label: "Bare disabled button", color: "positive", onPress: () => { }, disabled: true }))),
            React.createElement(ListSpacer, null),
            React.createElement(Sublist, { label: "Icon button", initialState: { collapsed: false } },
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(IconButton, { size: "large", icon: "fa-check", color: "positive", onPress: () => { } }),
                    React.createElement(IconButton, { size: "medium", icon: "fa-check", color: "positive", onPress: () => { } }),
                    React.createElement(IconButton, { size: "small", icon: "fa-check", color: "positive", onPress: () => { } }),
                    React.createElement(IconButton, { size: "large", icon: "fa-check", color: "positive", onPress: () => { }, bare: true }),
                    React.createElement(IconButton, { size: "medium", icon: "fa-check", color: "positive", onPress: () => { }, bare: true }),
                    React.createElement(IconButton, { size: "small", icon: "fa-check", color: "positive", onPress: () => { }, bare: true })),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(IconButton, { size: "large", icon: "fa-remove", color: "negative", onPress: () => { } }),
                    React.createElement(IconButton, { size: "medium", icon: "fa-remove", color: "negative", onPress: () => { } }),
                    React.createElement(IconButton, { size: "small", icon: "fa-remove", color: "negative", onPress: () => { } }),
                    React.createElement(IconButton, { size: "large", icon: "fa-remove", color: "negative", onPress: () => { }, bare: true }),
                    React.createElement(IconButton, { size: "medium", icon: "fa-remove", color: "negative", onPress: () => { }, bare: true }),
                    React.createElement(IconButton, { size: "small", icon: "fa-remove", color: "negative", onPress: () => { }, bare: true })),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(IconButton, { size: "large", icon: "fa-info", color: "secondary", onPress: () => { } }),
                    React.createElement(IconButton, { size: "medium", icon: "fa-info", color: "secondary", onPress: () => { } }),
                    React.createElement(IconButton, { size: "small", icon: "fa-info", color: "secondary", onPress: () => { } }),
                    React.createElement(IconButton, { size: "large", icon: "fa-info", color: "secondary", onPress: () => { }, bare: true }),
                    React.createElement(IconButton, { size: "medium", icon: "fa-info", color: "secondary", onPress: () => { }, bare: true }),
                    React.createElement(IconButton, { size: "small", icon: "fa-info", color: "secondary", onPress: () => { }, bare: true })),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(IconButton, { disabled: true, size: "large", icon: "fa-check", color: "positive", onPress: () => { } }),
                    React.createElement(IconButton, { disabled: true, size: "medium", icon: "fa-check", color: "positive", onPress: () => { } }),
                    React.createElement(IconButton, { disabled: true, size: "small", icon: "fa-check", color: "positive", onPress: () => { } }),
                    React.createElement(IconButton, { disabled: true, size: "large", icon: "fa-check", color: "positive", onPress: () => { }, bare: true }),
                    React.createElement(IconButton, { disabled: true, size: "medium", icon: "fa-check", color: "positive", onPress: () => { }, bare: true }),
                    React.createElement(IconButton, { disabled: true, size: "small", icon: "fa-check", color: "positive", onPress: () => { }, bare: true }))),
            React.createElement(ListSpacer, null),
            React.createElement(Sublist, { label: "Pressable list row", initialState: {
                    collapsed: false,
                } },
                React.createElement(ListPressableRow, { onPress: () => { }, headline: "Headline" }),
                React.createElement(ListPressableRow, { selected: true, onPress: () => { }, headline: "Selected" }),
                React.createElement(ListPressableRow, { onPress: () => { }, headline: "Headline", body: "Body" }),
                React.createElement(ListPressableRow, { onPress: () => { }, headline: "Disabled", body: "Body", disabled: true })),
            React.createElement(Sublist, { label: "Text", initialState: { collapsed: false } },
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(Text, { size: "large", color: "primary" }, "Primary large"),
                    React.createElement(Text, { size: "medium", color: "primary" }, "Primary medium"),
                    React.createElement(Text, { size: "small", color: "primary" }, "Primary small")),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(Text, { size: "large", color: "secondary" }, "Secondary large"),
                    React.createElement(Text, { size: "medium", color: "secondary" }, "Secondary medium"),
                    React.createElement(Text, { size: "small", color: "secondary" }, "Secondary small")),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(Text, { size: "large", color: "subtle" }, "Subtle large"),
                    React.createElement(Text, { size: "medium", color: "subtle" }, "Subtle medium"),
                    React.createElement(Text, { size: "small", color: "subtle" }, "Subtle small")),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(Text, { size: "large", color: "light" }, "Light large"),
                    React.createElement(Text, { size: "medium", color: "light" }, "Light medium"),
                    React.createElement(Text, { size: "small", color: "light" }, "Light small")),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(Text, { size: "large", color: "highlight" }, "Highlight large"),
                    React.createElement(Text, { size: "medium", color: "highlight" }, "Highlight medium"),
                    React.createElement(Text, { size: "small", color: "highlight" }, "Highlight small")),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(Text, { size: "large", color: "negative" }, "Negative large"),
                    React.createElement(Text, { size: "medium", color: "negative" }, "Negative medium"),
                    React.createElement(Text, { size: "small", color: "negative" }, "Negative small"))),
            React.createElement(ListSpacer, null),
            React.createElement(Sublist, { initialState: { collapsed: false }, label: "Icon" },
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(Icon, { size: "large", color: "primary", icon: "fa-check" }),
                    React.createElement(Icon, { size: "medium", color: "primary", icon: "fa-check" }),
                    React.createElement(Icon, { size: "small", color: "primary", icon: "fa-check" })),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(Icon, { size: "large", color: "secondary", icon: "fa-check" }),
                    React.createElement(Icon, { size: "medium", color: "secondary", icon: "fa-check" }),
                    React.createElement(Icon, { size: "small", color: "secondary", icon: "fa-check" })),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(Icon, { size: "large", color: "subtle", icon: "fa-check" }),
                    React.createElement(Icon, { size: "medium", color: "subtle", icon: "fa-check" }),
                    React.createElement(Icon, { size: "small", color: "subtle", icon: "fa-check" })),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(Icon, { size: "large", color: "light", icon: "fa-check" }),
                    React.createElement(Icon, { size: "medium", color: "light", icon: "fa-check" }),
                    React.createElement(Icon, { size: "small", color: "light", icon: "fa-check" }))),
            React.createElement(ListSpacer, null),
            React.createElement(Sublist, { initialState: { collapsed: false }, label: "Text pairing" },
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(TextPairing, { headline: "Headline" })),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(TextPairing, { headline: "Headline", body: "Body" })),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(TextPairing, { headline: "Headline", body: "Body", addOn: React.createElement(Icon, { size: "large", color: "primary", icon: "fa-user" }) }))),
            React.createElement(ListSpacer, null),
            React.createElement(Sublist, { initialState: { collapsed: false }, label: "Input" },
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(TextInput, { value: "", placeholder: "Placeholder text input", onValueChange: () => { } })),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(TextInput, { value: "", icon: "fa-user", placeholder: "Placeholder text input", onValueChange: () => { } })),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(TextInput, { value: "Text input", onValueChange: () => { } })),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(TextInput, { icon: "fa-user", value: "Text input", onValueChange: () => { } })),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(Checkbox, { size: "small", checked: false, onValueChange: () => { } }),
                    React.createElement(Checkbox, { size: "medium", checked: false, onValueChange: () => { } }),
                    React.createElement(Checkbox, { size: "large", checked: false, onValueChange: () => { } })),
                React.createElement(ListRow, { padding: "medium", gap: "medium" },
                    React.createElement(Checkbox, { size: "small", checked: true, onValueChange: () => { } }),
                    React.createElement(Checkbox, { size: "medium", checked: true, onValueChange: () => { } }),
                    React.createElement(Checkbox, { size: "large", checked: true, onValueChange: () => { } }))),
            React.createElement(ListSpacer, null),
            React.createElement(ListSpacer, null))));
}
//# sourceMappingURL=DesignBook.js.map