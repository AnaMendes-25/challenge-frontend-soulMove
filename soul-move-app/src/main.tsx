import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//2. configurand react-router -dom
import { RouterProvider } from "react-router";
import { router } from "./router"; // Importa as rotas separadas
import "./index.css";
import faviconIcon from "./assets/favicon/favicon.ico";

const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/x-icon";
favicon.href = faviconIcon;
document.head.appendChild(favicon);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
