import { RenderVNode } from "@/libs/types";

import { ReconciliationTest } from "@/components/reconciliation-test";
import { TodoContainer } from "@/components/todo";
import { App } from "@/App";

type Route = {
  path: string;
  element: () => RenderVNode;
};

const routes: Route[] = [
  { path: "/", element: () => <App /> },
  {
    path: "/test",
    element: () => <ReconciliationTest />,
  },
  {
    path: "/todo",
    element: () => <TodoContainer />,
  },
];

function getRouteComponent(): RenderVNode {
  const path = window.location.pathname;
  const route = routes.find((r) => r.path === path);
  return route ? route.element() : <div>404 - Not Found</div>;
}


export { getRouteComponent };
