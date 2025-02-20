import { updateRender } from "@/libs/react-dom/updateRender";
import { RenderVNode } from "@/libs/types";
import { addEventListener } from "./syntheticEvent";

import { camelToKebab, isStringOrNumber, normalizeToArray } from "@/utils";

/**
 * styleToString
 *
 * @param styleObj : style
 * @returns
 */
function styleToString(styleObj: Record<string, string>) {
  return Object.entries(styleObj)
    .map(([styleKey, styleValue]) => {
      const cssKey = camelToKebab(styleKey);
      return `${cssKey}: ${styleValue}`;
    })
    .join("; ");
}

/**
 * renderChildren
 *
 * children을 배열로 정규화하고
 * 각 자식을 렌더링하여 부모 노드에 추가
 */
function renderChildren(
  child: unknown,
  element: HTMLElement | DocumentFragment,
) {
  const children = normalizeToArray(child);

  children.forEach((item) => {
    const child = renderVNode(item as RenderVNode);
    element.append(child);
  });
  return element;
}

type AttributeHandler = (
  value: unknown,
  element: HTMLElement | DocumentFragment,
  key?: string,
  originKey?: string
) => void;

/**
 * attributeHandlers : 속성 유형 핸들러
 *
 * children: Virtual DOM의 자식 노드들을 실제 DOM으로 변환
 * style: 스타일 객체를 문자열로 변환하여 style 속성에 적용
 * default: 기본 속성 처리
 * addEvent: 이벤트 등록 처리
 */
export const attributeHandlers: Record<string, AttributeHandler> = {
  children: (value, element) => {
    renderChildren(value, element);
  },

  style: (value, element, key) => {
    if (element instanceof HTMLElement) {
      const styleString = styleToString(value as Record<string, string>);
      element.setAttribute(key ?? "", styleString);
    }
  },

  default: (value, element, key) => {
    if (element instanceof HTMLElement) {
      element.setAttribute(key ?? "", String(value));
    }
  },

  addEvent: (value, element, _, originKey) => {
    if (!(element instanceof HTMLElement) || !originKey) {
      return;
    }

    try {
      const handler = value as EventListener;
      addEventListener(element, originKey, handler);
    } catch (error) {
      console.error(`Failed to add event listener for ${originKey}:`, error);
    }
  },
};

/**
 * renderVnode
 *
 * VDOM을 실제 DOM으로 변환
 */
export function renderVNode(vNode: RenderVNode): Node {
  const { type, props } = vNode;

  if (isStringOrNumber(vNode)) {
    return document.createTextNode(String(vNode));
  }

  const element =
    type === "fragment"
      ? document.createDocumentFragment()
      : document.createElement(type as string);

  if (!props) {
    return element;
  }

  Object.entries(props).forEach(([key, value]) => {
    const originKey = key;
    if (key.startsWith("on")) {
      key = "addEvent";
    }
    const handler = attributeHandlers[key] || attributeHandlers.default;
    handler(value, element, key, originKey);
  });

  return element;
}

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
