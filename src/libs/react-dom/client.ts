import { VNode } from "@/libs/types";

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

  if (props?.children) {
    const children = renderChildren(props?.children, element);
    return children;
  }

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
