import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppContainer } from "@lark-apaas/client-toolkit-lite";
import "@lark-apaas/client-toolkit-lite/styles.css";
import App from "./app";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContainer>
      <App />
    </AppContainer>
  </StrictMode>,
);
