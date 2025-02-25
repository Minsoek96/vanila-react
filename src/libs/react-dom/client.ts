import { renderVNode } from "@/libs/react-dom/renderVnode";
import { updateRender } from "@/libs/react-dom/updateRender";

import { type RenderVNode } from "@/libs/types";

// RootStore
type RootStore = {
  rootElement: HTMLElement | null;
  rootComponent: (() => RenderVNode) | null;
  oldNode: RenderVNode | null;
  newNode: RenderVNode | null;
};

const store: RootStore = {
  rootElement: null,
  rootComponent: null,
  oldNode: null,
  newNode: null,
};

export const rootStore = () => ({
  get: () => store,
  set: (key: keyof RootStore, value: any) => {
    store[key] = value;
  },
});

export function createRoot(container?: HTMLElement) {
  const { set, get } = rootStore();

  if (container) {
    set("rootElement", container);
  }

  return {
    render(component: () => RenderVNode) {
      set("rootComponent", component);
      const { rootElement, rootComponent } = get();
      if (!rootElement || !rootComponent) {
        return;
      }

      rootElement.innerHTML = "";
      const initialNode = rootComponent();
      const element = renderVNode(initialNode);
      if (element) {
        rootElement.appendChild(element);
      }
      set("oldNode", initialNode);
    },

    update() {
      const { rootComponent, rootElement, oldNode } = get();

      if (!rootComponent) {
        return;
      }

      if (!(rootElement instanceof HTMLElement) || !oldNode) {
        return;
      }
      const newNode = rootComponent();
      set("newNode", newNode);

      const parentElement =
        rootElement.firstChild instanceof DocumentFragment
          ? rootElement
          : (rootElement.firstChild as HTMLElement);

      updateRender(oldNode, newNode, parentElement);
      set("oldNode", newNode);
    },
  };
}
