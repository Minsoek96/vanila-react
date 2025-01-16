import { VNode } from "@/libs/types";

import { camelToKebab } from "@/utils";

/**
 * styleToString
 *
 * @param styleObj : style
 * @returns
 */
function styleToString(styleObj: Record<string, string>) {
  return Object.entries(styleObj as Record<string, string>)
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
  key?: string
) => void;

/**
 * attributeHandlers : 속성 유형 핸들러
 *
 * children: Virtual DOM의 자식 노드들을 실제 DOM으로 변환
 * style: 스타일 객체를 문자열로 변환하여 style 속성에 적용
 * default: 기본 속성 처리
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
};

/**
 * renderVnode
 *
 * VDOM을 실제 DOM으로 변환
 */
function renderVNode(vNode: VNode): Node {
  const { type, props } = vNode;

  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  const element =
    type === "fragment"
      ? document.createDocumentFragment()
      : document.createElement(type as string);

  if (!props) {
    return element;
  }

  Object.entries(props).forEach(([key, value]) => {
    const handler = attributeHandlers[key] || attributeHandlers.default;
    handler(value, element, key);
  });

  return element;
}

export function createRoot(container: HTMLElement) {
  return {
    render(vnode: VNode) {
      container.innerHTML = "";
      const element = renderVNode(vnode);
      if (element) {
        container.appendChild(element);
      }
    },
  };
}
