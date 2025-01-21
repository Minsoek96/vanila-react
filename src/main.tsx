import { App } from "./App";

import { createRoot } from "@/libs/react-dom/client";

function main() {
  const container = document.getElementById("app");

  if (!container) {
    return;
  }

  const root = createRoot(container);
  root.render(<App />);
}
main();
