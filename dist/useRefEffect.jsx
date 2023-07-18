import { useRef, useCallback } from "react";
export function useRefEffect(callback) {
    const unsubscribeRef = useRef(null);
    const refCallback = useCallback((root) => {
        if (root === null) {
            unsubscribeRef.current && unsubscribeRef.current();
        }
        else {
            const unsubscribe = callback(root);
            unsubscribeRef.current = unsubscribe;
        }
    }, []);
    return refCallback;
}
//# sourceMappingURL=useRefEffect.jsx.map