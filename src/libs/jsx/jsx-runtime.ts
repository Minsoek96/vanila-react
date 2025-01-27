import { Component, Props, VNode } from "@/libs/types";

export const Fragment = "fragment";

export function jsx(type: Component, props: Props): VNode {
  if (typeof type === "function") {
    return type(props);
  }

  const { key, children, ...rest } = props || {};

  return {
    type,
    key: key?.toString() || null,
    props: children
      ? {
        ...rest,
        children: Array.isArray(children)
          ? children.flat(Infinity)
          : children,
      }
      : rest,
  };
}

export { jsx as jsxs };
