import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import App from "./App.tsx";
import Error from "./routes/Error/Index.tsx";
import Home from "./routes/Home/index.tsx";
import Contato from "./routes/Contato/index.tsx";
import Faq from "./routes/Faq/Index.tsx";
import Sobre from "./routes/Sobre/index.tsx";
import Integrantes from "./routes/Integrantes/index.tsx";
import Solucao from "./routes/Pages Funcionais/Solucao/index.tsx";
import Metricas from "./routes/Pages Funcionais/Metricas/index.tsx";
import Validacao from "./routes/Pages Funcionais/Validacao/index.tsx";
import Login from "./routes/Login/index.tsx";
// Adicionado tratamento de erro

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      // Rotas públicas
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "contato", element: <Contato /> },
      { path: "faq", element: <Faq /> },
      { path: "sobre", element: <Sobre /> },
      { path: "integrantes", element: <Integrantes /> },

      // Rotas privadas
      {
        element: <ProtectedRoute />,
        children: [
          { path: "solucao", element: <Solucao /> },
          { path: "metricas", element: <Metricas /> },
          { path: "validacao", element: <Validacao /> },
          { path: "validacao/:acaoId", element: <Validacao /> },
        ],
      },
    ],
  },
]);
