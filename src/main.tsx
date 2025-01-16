 
import { createRoot } from "@/libs/react-dom/client";
import { App } from "./App";

function main() {
  const container = document.getElementById("app");

  if (!container) {
    return;
  }

  const root = createRoot(container);
  root.render(<App/>);
}
main();
