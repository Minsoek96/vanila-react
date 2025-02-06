import { createRoot } from "@/libs/react-dom/client";

import { batchUpdate } from "./batchUpdate";

type InitialState<T> = null | T;
type SetStateAction<T> = T | ((prevState: T) => T);

type Store = {
  states: any[];
  currentIndex: number;

  effects: any[];
  depsIndex: number;
};

const store: Store = {
  //useState
  states: [],
  currentIndex: 0,

  //useEffect
  effects: [],
  depsIndex: 0,
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
  store.depsIndex = 0;
}

export function useState<T>(
  initialState: InitialState<T>,
): [T, (newValue: SetStateAction<T>) => void] {
  const hookIdx = store.currentIndex;

  if (store.states[hookIdx] === undefined) {
    store.states[hookIdx] = initialState;
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

/**TODO :
 * cleanup 실행 시점 잡기
 * unmount상태 updateRender Remove시
 * 정확한 대상 고유한 ID를 식별할 방법 모색하기
 */
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
      effect();
      store.effects[hookIdx] = {
        deps,
      };
    });
  }

  store.depsIndex++;
}