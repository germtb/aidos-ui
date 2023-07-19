import { useRefEffect } from "./useRefEffect";
export function useKeyboard(shortcuts) {
    return useRefEffect((root) => {
        const onKeyDown = (e) => {
            for (const { metaKey, key, action } of shortcuts) {
                if (metaKey && e.metaKey !== true) {
                    return;
                }
                if (e.key === key.toLowerCase()) {
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