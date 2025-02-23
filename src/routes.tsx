import { RenderVNode } from "@/libs/types";

import { ReconciliationTest, UserCard } from "@/components/reconciliation-test";
import { TodoContainer } from "@/components/todo";
import { App } from "@/App";

type RouteParams = {
  [key: string]: string;
};

type Route = {
  path: string;
  element: (params: RouteParams) => RenderVNode;
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
  {
    path: "/users/:userId/posts/:postId",
    element: (params) => <UserCard userId={params.userId} postId={params.postId} />,
  }
];

/**
* URL 패턴과 실제 경로를 매칭하여 동적 파라미터 추출
* @example 
* matchPath('/users/:id', '/users/123') - { id: '123' }
*/
function matchPath(pattern: string, path: string): RouteParams | null {
  const paramNames: string[] = [];
  
  const regexPattern = pattern
    .replace(/:[^/]+/g, (match) => {
      paramNames.push(match.slice(1));
      return "([^/]+)";
    })
    .replace(/\*/g, ".*");
  
  const regex = new RegExp(`^${regexPattern}$`);
  const match = path.match(regex);
  
  if (!match) return null;
  
  const params: RouteParams = {};
  paramNames.forEach((name, index) => {
    params[name] = match[index + 1];
  });
  
  return params;
}

/**
 * 현재 URL에 해당하는 컴포넌트 반환
 * @returns 매칭된 컴포넌트 또는 404 페이지
 */
function getRouteComponent() {
  const path = window.location.pathname;
  
  for (const route of routes) {
    const params = matchPath(route.path, path);
    if (params !== null) {
      return route.element(params);
    }
  }
  
  return <div>404 - Not Found</div>;
}


export { getRouteComponent };
