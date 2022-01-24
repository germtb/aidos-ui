import { createCallbackSet } from "./CallbackSet";
import { Time } from "./Time";

export type Input = {
  onUp: (callback: () => void) => void;
  onDown: (callback: () => void) => void;
  onRight: (callback: () => void) => void;
  onLeft: (callback: () => void) => void;
};

export const createInput = (time: Time): Input => {
  const { add: onUp, call: callOnUp } = createCallbackSet<void>();
  const { add: onDown, call: callOnDown } = createCallbackSet<void>();
  const { add: onRight, call: callOnRight } = createCallbackSet<void>();
  const { add: onLeft, call: callOnLeft } = createCallbackSet<void>();

  const throttledCallOnUp = time.throttle(callOnUp);
  const throttledCallOnDown = time.throttle(callOnDown);
  const throttledCallOnRight = time.throttle(callOnRight);
  const throttledCallOnLeft = time.throttle(callOnLeft);

  window.addEventListener("keypress", (e) => {
    if (e.key === "w") {
      throttledCallOnUp();
    } else if (e.key === "s") {
      throttledCallOnDown();
    } else if (e.key === "a") {
      throttledCallOnLeft();
    } else if (e.key === "d") {
      throttledCallOnRight();
    }
  });

  return {
    onUp,
    onDown,
    onRight,
    onLeft,
  };
};
