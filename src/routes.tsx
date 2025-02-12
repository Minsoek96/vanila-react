import { App } from "@/App";

import NavBar from "@/components/nav";

import { ReconciliationTest } from "@/components/reconciliation-test";
import { TodoContainer } from "@/components/todo";

type Route = {
  path?: string; 
  element: any;
  children?: Route[];
};

const routes: Route[] = [
  {
    element: <NavBar />,
    children: [
      { path: "/", element: <App /> },
      { path: "/test", element: <ReconciliationTest /> },
      { path: "/todo", element: <TodoContainer /> },
    ],
  },
];

export { routes };
