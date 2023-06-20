import { useRef, useCallback, useEffect } from "react";
export function useRefEffect(callback) {
    const unsubscribeRef = useRef(null);
    const refCallback = useCallback((root) => {
        if (root === null) {
            return;
        }
        unsubscribeRef.current && unsubscribeRef.current();
        const unsubscribe = callback(root);
        if (unsubscribe) {
            unsubscribeRef.current = unsubscribe;
        }
    }, []);
    useEffect(() => {
        return () => unsubscribeRef.current && unsubscribeRef.current();
    }, []);
    return refCallback;
}
//# sourceMappingURL=useRefEffect.js.map