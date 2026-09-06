import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//2. configurand react-router -dom
import { RouterProvider } from 'react-router';
import { router } from './router'; // Importa as rotas separadas
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
   </StrictMode>,
)
