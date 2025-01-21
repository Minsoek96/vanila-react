type Props = Record<string, unknown> | null;

type VNode = {
  type: Component;
  props: Props;
  key: string | null;
};

type RenderVNode = Omit<VNode, "type"> & {
  type: string;
};

type Component = string | ((props: Props) => VNode) | VNode;

export type { Props, VNode, Component, RenderVNode };
