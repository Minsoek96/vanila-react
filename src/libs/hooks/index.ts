import { App } from "@/App";
import { createRoot } from "@/libs/react-dom/client";

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

//TOOD : Client와 상태동기화 방법 생각하기
function reRender() {
  const container = document.getElementById("app");

  if (!container) {
    return;
  }

  const root = createRoot(container);
  root.render(App());

  store.currentIndex = 0;
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
    reRender();
  };

  store.currentIndex++;
  return [store.states[hookIdx], setState];
}
