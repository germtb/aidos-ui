import { startTransition, useEffect, useRef, useState } from "react";

export function useStream<Frame>({
  render,
  bufferStart,
  bufferEnd,
  index,
  debounce = 100,
}: {
  render: (index: number) => Frame;
  bufferStart: number;
  bufferEnd: number;
  index: number;
  debounce?: number;
}) {
  const [initialFrame] = useState(() => render(index));
  const cache = useRef<Record<number, Frame>>({ [index]: initialFrame });
  const [frame, setFrame] = useState(initialFrame);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeout.current != null) {
      clearTimeout(timeout.current);
    }
    const subscriptions: number[] = [];

    timeout.current = setTimeout(() => {
      for (let i = index - bufferStart; i < index + bufferEnd; i++) {
        subscriptions.push(
          requestIdleCallback(() => {
            if (!(i in cache.current)) {
              cache.current[i] = render(i);

              if (i === index) {
                setFrame(cache.current[index]);
              }
            }
          }),
        );
      }

      startTransition(() => {
        setFrame(cache.current[index]);
      });
    }, debounce);

    return () => {
      if (timeout.current != null) {
        clearTimeout(timeout.current);
      }
      subscriptions.forEach((handle) => {
        cancelIdleCallback(handle);
      });
    };
  }, [bufferEnd, bufferStart, debounce, index, render]);

  return {
    frame,
  };
}
