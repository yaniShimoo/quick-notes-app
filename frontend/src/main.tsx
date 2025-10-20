import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.tsx'

import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Notes from './pages/Notes';

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Notes /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
  ]},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
