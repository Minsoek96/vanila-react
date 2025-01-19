import { App } from "@/App";
import { createRoot } from "@/libs/react-dom/client";

type InitsialState<T> = null | T;
type SetStateAction<T> = T | ((prevState: T) => T);
let state: any = null;

function reRender() {
  const container = document.getElementById("app");

  if (!container) {
    return;
  }

  const root = createRoot(container);
  root.render(App());
}

export function useState<T>(
  initsialState: InitsialState<T>,
): [T, (newValue: SetStateAction<T>) => void] {
  state = state ?? initsialState;

  const setState = (newState: SetStateAction<T>) => {
    state =
      typeof newState === "function"
        ? (newState as (prev: T) => T)(state)
        : newState;

    reRender();
  };

  return [state, setState];
}
