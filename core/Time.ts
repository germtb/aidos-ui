import { createCallbackSet } from "../utils/CallbackSet";

export type Time = {
  now: () => number;
  onFrame: (callback: () => void) => () => void;
  resume: () => void;
  pause: () => void;
  isPaused: () => boolean;
  setFrameTimeout: (callback: () => void, frames: number) => () => void;
};

export function createTime({ frame }: { frame: number }): Time {
  const { add: onFrame, call } = createCallbackSet<void>();

  const state = {
    time: 0,
    date: Date.now(),
    paused: true,
  };

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
    }

    requestAnimationFrame(loop);
  }

  function pause() {
    state.paused = true;
  }

  function resume() {
    state.paused = false;
  }

  function isPaused() {
    return state.paused;
  }

  function setFrameTimeout(callback: () => void, delay: number) {
    let localTime = 0;
    const unsubscribe = onFrame(() => {
      localTime += 1;

      if (localTime >= delay) {
        callback();
        unsubscribe();
      }
    });

    return unsubscribe;
  }

  loop();

  return {
    now,
    onFrame,
    pause,
    resume,
    isPaused,
    setFrameTimeout,
  };
}
