import { createCallbackSet } from "./CallbackSet";

export type Time = {
  now: () => number;
  onFrame: (callback: () => void) => () => void;
  resume: () => void;
  pause: () => void;
  throttle: (callback: () => void) => () => void;
};

export function createTime({ frame }: { frame: number }): Time {
  const { add: onFrame, call } = createCallbackSet<void>();
  const state = {
    time: 0,
    date: Date.now(),
    paused: false,
  };
  const throttledCallbacks = new Set<{
    callback: () => void;
    queued: boolean;
  }>();

  function now() {
    return state.time;
  }

  function loop() {
    const delta = Date.now() - state.date;

    if (state.paused) {
      state.date = Date.now() + delta;
    }

    if (delta > frame) {
      state.time += 1;
      state.date = Date.now();
      call();
      throttledCallbacks.forEach((throttledCallback) => {
        if (throttledCallback.queued) {
          throttledCallback.callback();
          throttledCallback.queued = false;
        }
      });
    }

    requestAnimationFrame(loop);
  }

  function pause() {
    state.paused = true;
  }

  function resume() {
    state.paused = false;
  }

  function throttle(callback: () => void): () => void {
    const reference = {
      callback,
      queued: false,
    };

    throttledCallbacks.add(reference);

    return () => {
      if (reference.queued) {
        return;
      }

      reference.queued = true;
    };
  }

  loop();

  return {
    now,
    onFrame,
    pause,
    resume,
    throttle,
  };
}
