import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Error from "./routes/Error/Index.tsx";
import Home from "./routes/Home/index.tsx";
import Contato from "./routes/Contato/index.tsx";
import Faq from "./routes/Faq/Index.tsx";
import Sobre from "./routes/Sobre/index.tsx";
import Integrantes from "./routes/Integrantes/index.tsx";
import Solucao from "./routes/Pages Funcionais/Solucao/index.tsx";
// Adicionado tratamento de erro

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contato", element: <Contato /> },
      { path: "/faq", element: <Faq /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/integrantes", element: <Integrantes /> },
      { path: "/solucao", element: <Solucao /> },
    ],
  },
]);
