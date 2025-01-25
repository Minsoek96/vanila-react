import { RenderVNode } from "@/libs/types";

import { camelToKebab, convertToEventType } from "@/utils";

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
  element: HTMLElement | DocumentFragment
) {
  const children = Array.isArray(child) ? child : [child];

  children.forEach((item) => {
    const child = renderVNode(item);
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
const attributeHandlers: Record<string, AttributeHandler> = {
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
      const eventType = convertToEventType(originKey);
      const handler = value as EventListener;
      element.addEventListener(eventType, handler);
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
function renderVNode(vNode: RenderVNode): Node {
  const { type, props } = vNode;

  if (typeof vNode === "string" || typeof vNode === "number") {
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

//TOOD : 업데이트 렌더에 대한 구현 생각해보기
// 어떻게 parentNode를 순회할까 ?
function updateRender(
  oldNode: RenderVNode,
  newNode: RenderVNode,
  rootElement: HTMLElement
) {
  newNode.type = "div";
  if (oldNode.type !== newNode.type) {
    console.log("동작");
    const newEl = renderVNode(newNode);
    rootElement.innerHTML = "";
    rootElement.append(newEl);
  }
  console.log(rootElement);
  console.log(rootElement.childNodes);
  console.log(oldNode.type === newNode.type);
  console.log(oldNode);
  console.log("<------구분선------>");
  console.log(newNode);
  oldNode = newNode;
}

// TODO : const 변경 객체화에 대해서 생각해보기
let rootElement: HTMLElement | null = null;
let rootComponent: (() => RenderVNode) | null = null;
let oldNode: RenderVNode | null = null;
let newNode: RenderVNode | null = null;

export function createRoot(container?: HTMLElement) {
  if (container) {
    rootElement = container;
  }
  return {
    render(component: () => RenderVNode) {
      rootComponent = component;
      if (!rootElement || !rootComponent) {
        return;
      }
      rootElement.innerHTML = "";
      const element = renderVNode(rootComponent());
      if (element) {
        rootElement.appendChild(element);
      }
      oldNode = rootComponent();
    },

    update() {
      if (!rootComponent) {
        return;
      }
      newNode = rootComponent();
      if (!(rootElement instanceof HTMLElement)) {
        return;
      }
      updateRender(oldNode, newNode, rootElement);
      // this.render(rootComponent);
    },
  };
}
