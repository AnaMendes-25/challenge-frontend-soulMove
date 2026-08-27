import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home/index.tsx';
import Contato from './routes/Contato/index.tsx';
import Faq from './routes/Faq/Faq.tsx';
import App from './App.tsx';
import Sobre from './routes/Sobre/index.tsx';
import Integrantes from './routes/Integrantes/index.tsx';

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