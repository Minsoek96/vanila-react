import { Component, Props, VNode } from "@/libs/types";

export const Fragment = 'fragment'

export function jsx(type: Component, props: Props = null): VNode {
  const { key, ...restProps } = props || {};

  if (typeof type === "function") {
    return type(props);
  }

  return {
    type,
    key: key != null ? String(key) : null,
    props: restProps,
  };
}

export { jsx as jsxs };
