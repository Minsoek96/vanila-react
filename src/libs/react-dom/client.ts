import { VNode } from "@/libs/types";

export function createRoot(container: HTMLElement) {
  return {
    render(vnode: VNode) {
        console.log(vnode)
    },
  };
}
