// React and Context
import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom"
import { useAuth } from "../utils/auth";
import { AuthProvider, AuthRoute, initLocalStorage } from "../utils/auth";

// Vistas de la app
import { Home } from './Home';
import { Login } from './Login';
import { NotFound } from './NotFound';

// Componentes
import { Layout } from '../Components/Layout';
import { Sidebar } from "../Components/Sidebar";
import { BottomNav } from "../Components/BottomNav.jsx";
import { Historial } from "./Historial.jsx";

const AppRoutes = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  let routesConfig = [
    {
      path: '/', element:
        <AuthRoute>
          <Home />
        </AuthRoute>
    },
    {
      path: '/historial', element:
        <AuthRoute>
          <Historial />
        </AuthRoute>
    },
    { path: '/login', element: <Login /> },
    { path: '/*', element: <NotFound /> },
  ];

  let routes = useRoutes(routesConfig);

  return routes;
}

const App = () => {
  initLocalStorage()
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Sidebar />
          <BottomNav />
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export { App }