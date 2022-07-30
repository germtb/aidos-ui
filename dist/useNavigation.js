import { useRef, useCallback, useEffect } from "react";
import { queryFocusables, focusElement, normalizeElements } from "./aria";
export function useNavigation({ autofocus = false, rowLength = 1 } = {}) {
    const unsubscribeRef = useRef(null);
    const refCallback = useCallback((root) => {
        if (root === null) {
            return;
        }
        let index = 0;
        const elements = queryFocusables(root);
        if (elements.length !== 0 && autofocus) {
            focusElement(elements, index);
        }
        else {
            normalizeElements(elements, index);
        }
        const onKeyDown = (e) => {
            const elements = queryFocusables(root);
            if (elements.length === 0) {
                return;
            }
            let newIndex = -1;
            if (e.code === "ArrowUp") {
                if (index - rowLength < 0) {
                    newIndex = elements.length - (elements.length % rowLength) + index;
                }
                else {
                    newIndex = index - rowLength;
                }
            }
            else if (e.code === "ArrowLeft") {
                if (index <= 0) {
                    newIndex = elements.length - 1;
                }
                else {
                    newIndex = index - 1;
                }
            }
            else if (e.code === "ArrowRight") {
                if (index >= elements.length - 1) {
                    newIndex = 0;
                }
                else {
                    newIndex = index + 1;
                }
            }
            else if (e.code === "ArrowDown") {
                if (index + rowLength > elements.length - 1) {
                    newIndex = (index + rowLength) % rowLength;
                }
                else {
                    newIndex = index + rowLength;
                }
            }
            if (newIndex !== -1 && index !== newIndex) {
                index = newIndex;
                focusElement(elements, index);
                e.preventDefault();
            }
        };
        root.addEventListener("keydown", onKeyDown);
        const observer = new MutationObserver((mutationList) => {
            if (mutationList.filter((m) => m.type === "childList").length > 0) {
                const elements = queryFocusables(root);
                normalizeElements(elements, index);
            }
        });
        observer.observe(root, { childList: true });
        unsubscribeRef.current = () => {
            root.removeEventListener("keydown", onKeyDown);
        };
    }, []);
    useEffect(() => {
        return () => unsubscribeRef.current && unsubscribeRef.current();
    }, []);
    return refCallback;
}
