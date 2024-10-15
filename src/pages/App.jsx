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
import { Empleados } from "./Empleados.jsx";
import { Vehiculos } from "./Vehiculos.jsx";
import { Checklists } from "./Checklists.jsx";

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

  const HomePage = () => {
    if (user.tipo_usuario === 0) {
      return <Home />
    } else {
      return <AdminHome />
    }
  }

  const ChecklistsAdmin = () => {
    if (user.tipo_usuario === 0) {
      return
    } else {
      return <Checklists />
    }
  }
  let routesConfig = [
    {
      path: '/', element:
        <AuthRoute>
          <HomePage />
        </AuthRoute>
    },
    {
      path: '/empleados', element:
        <AuthRoute>
          <Empleados />
        </AuthRoute>
    },
    {
      path: '/vehiculos', element:
        <AuthRoute>
          <Vehiculos />
        </AuthRoute>
    },
    {
      path: '/checklists', element:
        <AuthRoute>
          <ChecklistsAdmin />
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