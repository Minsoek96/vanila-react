import { createRoot } from "@/libs/react-dom/client";

import { batchUpdate } from "./batchUpdate";

type InitsialState<T> = null | T;
type SetStateAction<T> = T | ((prevState: T) => T);

type Store = {
  states: any[];
  currentIndex: number;
};

const store: Store = {
  states: [],
  currentIndex: 0,
};

/**
 * reRender
 *
 * 현재 client 상태와 연결 해주는 함수
 */
function reRender() {
  const root = createRoot();
  root.update();
}

export function resetStore() {
  store.currentIndex = 0;
}

export function useState<T>(
  initsialState: InitsialState<T>
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

export function useEffect(
  effect: () => void | (() => void),
  deps?: any[],
): void {
  const hookIdx = store.currentIndex;
  const oldHook = store.states[hookIdx];

  let hasChanged = true;

  if (deps && oldHook && oldHook.deps) {
    hasChanged = deps.some((dep, i) => !Object.is(dep, oldHook.deps[i]));
  }

  if (hasChanged) {
    queueMicrotask(() => {
      if (typeof oldHook?.cleanup === "function") {
        oldHook.cleanup();
      }
      const cleanup = effect();
      store.states[hookIdx] = { deps, cleanup };
    });
  }

  store.currentIndex++;
}
