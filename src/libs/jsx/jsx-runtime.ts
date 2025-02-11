import { Component, Props, VNode } from "@/libs/types";

/**
 * isValudChild
 *
 * 유효한 렌더링 자식인지 판단합니다.
 * false, undefined, null은 렌더링에서 제외
 */
const isValidChild = (child: unknown) =>
  child !== false && child !== undefined && child !== null;

/**
 * normalizeChildren
 *
 * 자식 요소들을 정규화하는 함수
 * 1. 유효하지 않은 자식(false/undefined/null)이면 null 반환
 * 2. 배열이면 평탄화하고 유효한 자식만 필터링
 * */

const normalizeChildren = (children: unknown) => {
  if (!isValidChild(children)) {
    return null;
  }
  if (Array.isArray(children)) {
    const validChildren = children.flat(Infinity).filter(isValidChild);
    return validChildren.length > 0 ? validChildren : null;
  }

  return children;
};

export const Fragment = "fragment";

export function jsx(type: Component, props: Props, key: string): VNode {
  if (typeof type === "function") {
    return type(props);
  }

  const { children, ...rest } = props || {};
  const nodes = normalizeChildren(children);

  return {
    type,
    key: key?.toString() || null,
    props: nodes !== null ? { ...rest, children: nodes } : rest,
  };
}

export { jsx as jsxs };
