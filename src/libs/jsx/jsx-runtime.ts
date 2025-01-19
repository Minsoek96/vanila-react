type Props = Record<string, unknown> | null;

type VNode = {
  type: Component;
  props: Props;
  key: string | null;
};

type Component = string | ((props: Props) => VNode) | VNode;

export const Fragment = 'fragement'

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
