import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { RootView } from "./RootView";
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
import { ListButtonItem } from "./ListButtonItem";
import { Dialog, useDialog } from "./Dialog";
import { Row } from "./Row";
import { DarkModeContext } from "./DarkMode";
import { Popover, PopoverTrigger } from "./Popover";
import { Tooltip } from "./Tooltip";
import { Link } from "./Link";
import { Calendar } from "./Calendar";
import { Box } from "./Box";
import { Badge } from "./Badge";
function ExampleDialog({ close }) {
    const darkMode = useContext(DarkModeContext);
    return (_jsx(Dialog, { close: close, label: "Example", children: _jsxs(Row, { padding: "medium", align: "center", justify: "space-between", children: [_jsx(Text, { children: "Dark mode" }), _jsx(Checkbox, { size: "medium", checked: darkMode.enabled, onClick: () => darkMode.toggle() })] }) }));
}
export function DesignBook() {
    const dialog = useDialog(({ close }) => _jsx(ExampleDialog, { close: close }), { closeOnOutsideClick: true });
    const [checkbox1, setCheckbox1] = useState(true);
    const [checkbox2, setCheckbox2] = useState(true);
    const [checkbox3, setCheckbox3] = useState(true);
    const [checkbox4, setCheckbox4] = useState(false);
    const [checkbox5, setCheckbox5] = useState(false);
    const [checkbox6, setCheckbox6] = useState(false);
    return (_jsx(RootView, { children: _jsxs(List, { navigation: false, ariaLabel: "Design book", children: [_jsx(ListSpacer, {}), _jsxs(Sublist, { label: "Button", initialState: { collapsed: false }, children: [_jsx(Row, { gap: "medium", children: _jsx(Button, { label: "Positive button", color: "positive", onClick: () => {
                                    dialog.open();
                                } }) }), _jsx(Row, { gap: "medium", children: _jsx(PopoverTrigger, { PopoverComponent: ({ close }) => {
                                    return (_jsx(Popover, { close: close, children: _jsxs(List, { navigation: false, ariaLabel: "Popover ", children: [_jsx(ListButtonItem, { gap: "medium", addOn: _jsx(Icon, { size: "medium", color: "primary", icon: "fa-address-book" }), headline: "Option 1", onClick: () => { }, color: "positive" }), _jsx(ListButtonItem, { gap: "medium", addOn: _jsx(Icon, { size: "medium", color: "primary", icon: "fa-adjust" }), headline: "Option 2", onClick: () => { }, withDivider: false, color: "positive" })] }) }));
                                }, children: ({ toggle }) => (_jsx(Button, { style: { position: "relative" }, label: "Secondary button", color: "secondary", onClick: () => {
                                        toggle(undefined);
                                    } })) }) }), _jsx(Row, { gap: "medium", children: _jsx(PopoverTrigger, { PopoverComponent: ({ close }) => {
                                    return (_jsx(Popover, { close: close, children: _jsxs(List, { ariaLabel: "Popover ", children: [_jsx(ListButtonItem, { gap: "medium", addOn: _jsx(Icon, { size: "medium", color: "primary", icon: "fa-address-book" }), headline: "Option 1", onClick: () => { }, color: "positive" }), _jsx(ListButtonItem, { gap: "medium", addOn: _jsx(Icon, { size: "medium", color: "primary", icon: "fa-adjust" }), headline: "Option 2", onClick: () => { }, withDivider: false, color: "positive" })] }) }));
                                }, children: ({ toggle }) => (_jsx(Button, { label: "Negative button", color: "negative", onClick: () => {
                                        toggle(undefined);
                                    } })) }) }), _jsx(Row, { gap: "medium", children: _jsx(Tooltip, { content: "Tooltip here", children: _jsx(Button, { label: "Disabled button", color: "positive", onClick: () => { }, disabled: true }) }) }), _jsx(Row, { gap: "medium", children: _jsx(Button, { bare: true, label: "Bare positive button", color: "positive", onClick: () => { } }) }), _jsx(Row, { gap: "medium", children: _jsx(Button, { bare: true, label: "Bare secondary button", color: "secondary", onClick: () => { } }) }), _jsx(Row, { gap: "medium", children: _jsx(Button, { bare: true, label: "Bare negative button", color: "negative", onClick: () => { } }) }), _jsx(Row, { gap: "medium", children: _jsx(Button, { bare: true, label: "Bare disabled button", color: "positive", onClick: () => { }, disabled: true }) })] }), _jsxs(Sublist, { label: "Link", initialState: { collapsed: false }, children: [_jsx(Row, { gap: "medium", children: _jsx(Link, { label: "Positive link", color: "positive", href: "/" }) }), _jsx(Row, { gap: "medium", children: _jsx(Link, { label: "Secondary link", color: "secondary", href: "/" }) }), _jsx(Row, { gap: "medium", children: _jsx(Tooltip, { content: "Tooltip here", children: _jsx(Link, { label: "Disabled link", color: "positive", href: "/", disabled: true }) }) }), _jsx(Row, { gap: "medium", children: _jsx(Link, { bare: true, label: "Bare positive Link", color: "positive", href: "/" }) }), _jsx(Row, { gap: "medium", children: _jsx(Link, { bare: true, label: "Bare secondary Link", color: "secondary", href: "/" }) }), _jsx(Row, { gap: "medium", children: _jsx(Link, { bare: true, label: "Bare negative Link", color: "negative", href: "/" }) }), _jsx(Row, { gap: "medium", children: _jsx(Link, { bare: true, label: "Bare disabled Link", color: "positive", href: "/", disabled: true }) })] }), _jsx(ListSpacer, {}), _jsxs(Sublist, { label: "Icon button", initialState: { collapsed: false }, children: [_jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(IconButton, { size: "large", icon: "fa-check", color: "positive", onClick: () => { } }), _jsx(IconButton, { size: "medium", icon: "fa-check", color: "positive", onClick: () => { } }), _jsx(IconButton, { size: "small", icon: "fa-check", color: "positive", onClick: () => { } }), _jsx(IconButton, { size: "large", icon: "fa-check", color: "positive", onClick: () => { }, bare: true }), _jsx(IconButton, { size: "medium", icon: "fa-check", color: "positive", onClick: () => { }, bare: true }), _jsx(IconButton, { size: "small", icon: "fa-check", color: "positive", onClick: () => { }, bare: true })] }), _jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(IconButton, { size: "large", icon: "fa-remove", color: "negative", onClick: () => { } }), _jsx(IconButton, { size: "medium", icon: "fa-remove", color: "negative", onClick: () => { } }), _jsx(IconButton, { size: "small", icon: "fa-remove", color: "negative", onClick: () => { } }), _jsx(IconButton, { size: "large", icon: "fa-remove", color: "negative", onClick: () => { }, bare: true }), _jsx(IconButton, { size: "medium", icon: "fa-remove", color: "negative", onClick: () => { }, bare: true }), _jsx(IconButton, { size: "small", icon: "fa-remove", color: "negative", onClick: () => { }, bare: true })] }), _jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(IconButton, { size: "large", icon: "fa-info", color: "secondary", onClick: () => { } }), _jsx(IconButton, { size: "medium", icon: "fa-info", color: "secondary", onClick: () => { } }), _jsx(IconButton, { size: "small", icon: "fa-info", color: "secondary", onClick: () => { } }), _jsx(IconButton, { size: "large", icon: "fa-info", color: "secondary", onClick: () => { }, bare: true }), _jsx(IconButton, { size: "medium", icon: "fa-info", color: "secondary", onClick: () => { }, bare: true }), _jsx(IconButton, { size: "small", icon: "fa-info", color: "secondary", onClick: () => { }, bare: true })] }), _jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(IconButton, { disabled: true, size: "large", icon: "fa-check", color: "positive", onClick: () => { } }), _jsx(IconButton, { disabled: true, size: "medium", icon: "fa-check", color: "positive", onClick: () => { } }), _jsx(IconButton, { disabled: true, size: "small", icon: "fa-check", color: "positive", onClick: () => { } }), _jsx(IconButton, { disabled: true, size: "large", icon: "fa-check", color: "positive", onClick: () => { }, bare: true }), _jsx(IconButton, { disabled: true, size: "medium", icon: "fa-check", color: "positive", onClick: () => { }, bare: true }), _jsx(IconButton, { disabled: true, size: "small", icon: "fa-check", color: "positive", onClick: () => { }, bare: true })] })] }), _jsx(ListSpacer, {}), _jsxs(Sublist, { label: "Pressable list row", initialState: {
                        collapsed: false,
                    }, children: [_jsx(ListButtonItem, { onClick: () => { }, headline: "Headline", color: "positive" }), _jsx(ListButtonItem, { selected: true, onClick: () => { }, headline: "Selected", color: "positive" }), _jsx(ListButtonItem, { onClick: () => { }, headline: "Headline", body: "Body", color: "positive" }), _jsx(ListButtonItem, { onClick: () => { }, headline: "Disabled", body: "Body", disabled: true, color: "positive" }), _jsx(ListButtonItem, { gap: "medium", addOn: _jsx(Box, { padding: "medium", children: _jsx(Icon, { size: "medium", color: "primary", icon: "fa-address-book" }) }), headline: "Really long body", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", onClick: () => { }, color: "positive" })] }), _jsxs(Sublist, { label: "Text", initialState: { collapsed: false }, children: [_jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(Text, { size: "large", color: "primary", children: "Primary large" }), _jsx(Text, { size: "medium", color: "primary", children: "Primary medium" }), _jsx(Text, { size: "small", color: "primary", children: "Primary small" })] }), _jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(Text, { size: "large", color: "secondary", children: "Secondary large" }), _jsx(Text, { size: "medium", color: "secondary", children: "Secondary medium" }), _jsx(Text, { size: "small", color: "secondary", children: "Secondary small" })] }), _jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(Text, { size: "large", color: "subtle", children: "Subtle large" }), _jsx(Text, { size: "medium", color: "subtle", children: "Subtle medium" }), _jsx(Text, { size: "small", color: "subtle", children: "Subtle small" })] }), _jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(Text, { size: "large", color: "light", children: "Light large" }), _jsx(Text, { size: "medium", color: "light", children: "Light medium" }), _jsx(Text, { size: "small", color: "light", children: "Light small" })] }), _jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(Text, { size: "large", color: "highlight", children: "Highlight large" }), _jsx(Text, { size: "medium", color: "highlight", children: "Highlight medium" }), _jsx(Text, { size: "small", color: "highlight", children: "Highlight small" })] }), _jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(Text, { size: "large", color: "negative", children: "Negative large" }), _jsx(Text, { size: "medium", color: "negative", children: "Negative medium" }), _jsx(Text, { size: "small", color: "negative", children: "Negative small" })] })] }), _jsx(ListSpacer, {}), _jsxs(Sublist, { initialState: { collapsed: false }, label: "Icon", children: [_jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(Icon, { size: "large", color: "primary", icon: "fa-check" }), _jsx(Icon, { size: "medium", color: "primary", icon: "fa-check" }), _jsx(Icon, { size: "small", color: "primary", icon: "fa-check" })] }), _jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(Icon, { size: "large", color: "secondary", icon: "fa-check" }), _jsx(Icon, { size: "medium", color: "secondary", icon: "fa-check" }), _jsx(Icon, { size: "small", color: "secondary", icon: "fa-check" })] }), _jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(Icon, { size: "large", color: "subtle", icon: "fa-check" }), _jsx(Icon, { size: "medium", color: "subtle", icon: "fa-check" }), _jsx(Icon, { size: "small", color: "subtle", icon: "fa-check" })] }), _jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(Icon, { size: "large", color: "light", icon: "fa-check" }), _jsx(Icon, { size: "medium", color: "light", icon: "fa-check" }), _jsx(Icon, { size: "small", color: "light", icon: "fa-check" })] })] }), _jsx(ListSpacer, {}), _jsxs(Sublist, { initialState: { collapsed: false }, label: "Text pairing", children: [_jsx(Row, { padding: "medium", gap: "medium", children: _jsx(TextPairing, { headline: "Headline" }) }), _jsx(Row, { padding: "medium", gap: "medium", children: _jsx(TextPairing, { headline: "Headline", body: "Body" }) }), _jsx(Row, { padding: "medium", gap: "medium", children: _jsx(TextPairing, { headline: "Headline", body: "Body", addOn: _jsx(Icon, { size: "large", color: "primary", icon: "fa-user" }) }) })] }), _jsx(ListSpacer, {}), _jsxs(Sublist, { initialState: { collapsed: false }, label: "Input", children: [_jsx(Row, { padding: "medium", gap: "medium", children: _jsx(TextInput, { value: "", placeholder: "Placeholder text input", onValueChange: () => { } }) }), _jsx(Row, { padding: "medium", gap: "medium", children: _jsx(TextInput, { value: "Text input", onValueChange: () => { } }) }), _jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(Checkbox, { size: "small", checked: checkbox1, onClick: () => setCheckbox1((x) => !x) }), _jsx(Checkbox, { size: "medium", checked: checkbox2, onClick: () => setCheckbox2((x) => !x) }), _jsx(Checkbox, { size: "large", checked: checkbox3, onClick: () => setCheckbox3((x) => !x) })] }), _jsxs(Row, { padding: "medium", gap: "medium", children: [_jsx(Checkbox, { size: "small", checked: checkbox4, onClick: () => setCheckbox4((x) => !x) }), _jsx(Checkbox, { size: "medium", checked: checkbox5, onClick: () => setCheckbox5((x) => !x) }), _jsx(Checkbox, { size: "large", checked: checkbox6, onClick: () => setCheckbox6((x) => !x) })] })] }), _jsx(ListSpacer, {}), _jsx(ListSpacer, {}), _jsx(Sublist, { label: "Calendar", children: _jsx(Calendar, { date: new Date(), header: ({ weekday }) => (_jsx(Box, { children: _jsx(Text, { children: weekday }) })), cell: ({ today, date, outOfMonth }) => (_jsxs(Box, { relative: true, style: { opacity: outOfMonth ? 0.2 : 1 }, children: [today && (_jsx(Badge, { jsStyle: {
                                        position: "absolute",
                                        top: "50%",
                                        transform: "translateY(-50%) translateX(-75%)",
                                        right: "50%",
                                    } })), _jsx(Text, { children: date.getDate() })] })) }) })] }) }));
}
//# sourceMappingURL=DesignBook.js.map