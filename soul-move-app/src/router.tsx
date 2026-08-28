import { createBrowserRouter } from 'react-router';
import App from './App.tsx';
import Error from './routes/Error/Index.tsx';
import Home from './routes/Home/Index.tsx';
import Contato from './routes/Contato/Index.tsx';
import Faq from './routes/Faq/Index.tsx';
import Sobre from './routes/Sobre/Index.tsx';
import Integrantes from './routes/Integrantes/Index.tsx';

 // Adicionado tratamento de erro

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error/>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/contato', element: <Contato /> },
      { path: '/faq', element: <Faq /> },
      { path: '/sobre', element: <Sobre /> },
      { path: '/integrantes', element: <Integrantes /> },
    ],
  },
]);