import { getRouteComponent } from "@/routes";
import { createRoot } from "@/libs/react-dom";

import NavBar from "@/components/nav";

function RootLayout() {
  const currentPath = getRouteComponent();
  return (
    <div>
      <NavBar/>
      {currentPath}
    </div>
  );
}

function main() {
  const container = document.getElementById("app");

  if (!container) {
    return;
  }

  const root = createRoot(container);

  //경로 변경 이벤트 등록
  window.addEventListener('routechange', () => {
    root.update();
  });

  //네비게이션 이벤트 등록
  window.addEventListener('popstate', () => {
    root.update();
  });

  root.render(() => {
    return <RootLayout />;
  });
}
main();
