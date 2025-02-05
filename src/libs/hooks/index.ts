import { createRoot } from "@/libs/react-dom/client";

import { batchUpdate } from "./batchUpdate";

type InitsialState<T> = null | T;
type SetStateAction<T> = T | ((prevState: T) => T);

type Store = {
  states: any[];
  currentIndex: number;

  effects: any[];
  depsIndex: number;
  cleanups: (() => void)[];
};

const store: Store = {
  //useState
  states: [],
  currentIndex: 0,

  //useEffect
  effects: [],
  depsIndex: 0,
  cleanups: [],
};

/**
 * 현재 client 상태와 연결 해주는 함수
 */
function reRender() {
  const root = createRoot();
  root.update();
}

export function resetStore() {
  store.currentIndex = 0;
  resetEffectStore();
}

export function useState<T>(
  initsialState: InitsialState<T>,
): [T, (newValue: SetStateAction<T>) => void] {
  const hookIdx = store.currentIndex;

  if (store.states[hookIdx] === undefined) {
    store.states[hookIdx] = initsialState;
  }

  const setState = (newState: SetStateAction<T>) => {
    const nextState =
      typeof newState === "function"
        ? (newState as (prev: T) => T)(store.states[hookIdx])
        : newState;
    if (Object.is(nextState, store.states[hookIdx])) {
      return;
    }

    store.states[hookIdx] = nextState;
    batchUpdate(reRender);
  };

  store.currentIndex++;
  return [store.states[hookIdx], setState];
}

export function resetEffectStore() {
  store.depsIndex = 0;
}

export function useEffect(
  effect: () => void | (() => void),
  deps?: any[],
): void {
  const hookIdx = store.depsIndex;
  const oldHook = store.effects[hookIdx];

  let hasChanged = true;

  if (deps && oldHook && oldHook.deps) {
    hasChanged = deps.some((dep, i) => !Object.is(dep, oldHook.deps[i]));
  }

  if (hasChanged) {
    queueMicrotask(() => {
      if (oldHook?.cleanup) {
        oldHook.cleanup();
      }

      const cleanup = effect();
      store.effects[hookIdx] = {
        deps,
        cleanup: typeof cleanup === "function" ? cleanup : undefined,
      };

      if (typeof cleanup === "function") {
        store.cleanups[hookIdx] = cleanup;
      }
    });
  }

  store.depsIndex++;
}

export function effectCleanup() {
  const currentIdx = store.depsIndex;
  if (store.cleanups[currentIdx]) {
    store.cleanups[currentIdx]();
    store.effects[currentIdx] = undefined;
  }
}
