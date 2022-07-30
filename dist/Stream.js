import { startTransition, useEffect, useRef, useState } from "react";
export const useStream = ({ render, bufferStart, bufferEnd, index, debounce = 100, }) => {
    const cache = useRef({
        [index]: render(index),
    });
    const [frame, setFrame] = useState(cache.current[index]);
    const timeout = useRef(null);
    useEffect(() => {
        clearTimeout(timeout.current);
        const subscriptions = [];
        timeout.current = setTimeout(() => {
            for (let i = index - bufferStart; i < index + bufferEnd; i++) {
                subscriptions.push(requestIdleCallback(() => {
                    if (!(i in cache.current)) {
                        cache.current[i] = render(i);
                        if (i === index) {
                            setFrame(cache.current[index]);
                        }
                    }
                }));
            }
            startTransition(() => {
                setFrame(cache.current[index]);
            });
        }, debounce);
        return () => {
            subscriptions.forEach((handle) => {
                cancelIdleCallback(handle);
            });
        };
    }, [index]);
    return {
        frame,
    };
};
