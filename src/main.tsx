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
  root.render(() => {
    return <RootLayout />;
  });
}
main();
