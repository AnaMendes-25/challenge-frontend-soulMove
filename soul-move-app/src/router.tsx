import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Contato from './pages/Contato/Contato.tsx';
import Faq from './pages/Faq/Faq.tsx';
import App from './App.tsx';
import Sobre from './pages/Sobre/Sobre.tsx';
import Integrantes from './pages/Integrantes/Integrantes.tsx';

export const router = createBrowserRouter([
    {path: '/', element: <App />,
    children:[
        {path: '/', element: <Home />},
        {path: '/contato', element: <Contato />},
        {path: '/faq', element: <Faq />},
        {path: '/sobre', element: <Sobre />},
        {path: '/integrantes', element: <Integrantes/>}
    ]
    },
]);