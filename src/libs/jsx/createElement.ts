type Props = Record<string, unknown> | null;

type VNode = {
  type: Component;
  props: Props;
  key: string | null;
};

type Component = string | ((props: Props) => VNode) | VNode;

type Child = VNode | string | number | boolean;

export function createElement(
  type: Component,
  props: Props = null,
  ...children: (Child | null)[]
): VNode {
  const { key, ...restProps } = props || {};

  if (typeof type === "function") {
    return type({
      ...props,
      children: children.length === 1 ? children[0] : children,
    });
  }

  return {
    type,
    key: key != null ? String(key) : null,
    props: {
      ...restProps,
      children: children.length === 1 ? children[0] : children,
    },
  };
}
