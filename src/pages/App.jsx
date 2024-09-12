// React and Context
import { useEffect, useState } from "react"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { useAuth } from "../utils/auth";
import { AuthProvider, AuthRoute, initLocalStorage } from "../utils/auth";

// Vistas de la app
import { Home } from './Home';
import { Login } from './Login';
import { NotFound } from './NotFound';

// Componentes
import { Layout } from '../Components/Layout';
import { AdminHome } from "./AdminHome.jsx";

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
      path: '/admin', element:
        <AuthRoute>
          <AdminHome />
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
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export { App }