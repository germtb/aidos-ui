import { useRefEffect } from "./useRefEffect";
export function useKeyboard(shortcuts) {
    return useRefEffect((root) => {
        const onKeyDown = (e) => {
            for (const { metaKey, key, action, ctrlKey, onlyWhenFocused, } of shortcuts) {
                if (metaKey && e.metaKey !== true) {
                    continue;
                }
                else if (ctrlKey && e.ctrlKey !== true) {
                    continue;
                }
                else if (onlyWhenFocused && document.activeElement !== root) {
                    continue;
                }
                if (e.key.toLowerCase() === key.toLowerCase()) {
                    action(root);
                }
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    });
}
//# sourceMappingURL=useKeyboard.jsx.map