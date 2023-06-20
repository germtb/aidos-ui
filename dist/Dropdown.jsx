import React, { useEffect, useRef, useState } from "react";
import { BaseView } from "./BaseView";
import { guid } from "./guid";
import { Button } from "./Button";
import { getBackground, createJSStyles, grow } from "./Palette";
import { Column } from "./Column";
import { useNavigation } from "./useNavigation";
import { useRefEffect } from "./useRefEffect";
const jsStyles = createJSStyles({
    root: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
    },
    button: {
        flexGrow: 1,
    },
    dropdown: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        borderRadius: "var(--border-radius-m)",
        boxShadow: "0px 1px 2px var(--divider)",
        zIndex: 1,
    },
});
export function Dropdown({ id = guid(), label, options, selection, setSelection, jsStyle, }) {
    const triggerRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const dropdownRef = useNavigation({ autofocus: true });
    const rootRef = useRefEffect((root) => {
        const onKeyDown = (e) => {
            if (e.code === "Escape") {
                setExpanded(false);
            }
        };
        root.addEventListener("keydown", onKeyDown);
        return () => root.removeEventListener("keydown", onKeyDown);
    });
    useEffect(() => {
        if (!expanded) {
            triggerRef.current && triggerRef.current.focus();
        }
    }, [expanded]);
    return (<BaseView ref={rootRef} jsStyle={[jsStyles.root, grow, jsStyle]}>
      <Button aria-expanded={expanded ? "true" : "false"} aria-controls={id} aria-haspopup="true" aria-label={label} role="combobox" justify="space-between" tabIndex={0} jsStyle={jsStyles.button} label={selection.toString()} color="positive" icon="fa-chevron-down" iconPosition="right" onPress={() => {
            setExpanded((x) => !x);
        }} ref={triggerRef}/>
      {expanded && (<Column gap="medium" jsStyle={[jsStyles.dropdown, getBackground("secondary-background")]} id={id} role="listbox" aria-label={label} tabIndex={-1} ref={dropdownRef} onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setExpanded(false);
                }
            }}>
          {Array.from(options).map((option, index) => {
                const optionId = `${id}-${index}`;
                const selected = option === selection;
                return (<Button justify={selected ? "space-between" : "flex-start"} align="center" bare={true} iconPosition="right" icon={selected ? "fa-check" : undefined} key={optionId} role="option" id={optionId} aria-selected={selected ? "true" : "false"} label={option.toString()} color="positive" onPress={() => {
                        setSelection(option);
                        setExpanded(false);
                    }}/>);
            })}
        </Column>)}
    </BaseView>);
}
//# sourceMappingURL=Dropdown.jsx.map