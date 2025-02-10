import { App } from "./App";

import { createRoot } from "@/libs/react-dom";

function main() {
  const container = document.getElementById("app");

  if (!container) {
    return;
  }

  const root = createRoot(container);
  root.render(() => {
    return <App />;
  });
}
main();
