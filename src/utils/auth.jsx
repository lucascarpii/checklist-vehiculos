import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')) || null);

  const login = (user) => {
    // Logica con la base de datos para iniciar sesion
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const auth = { user, login, logout };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const auth = React.useContext(AuthContext);
  return auth;
}

function AuthRoute(props) {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return props.children;
}

const initLocalStorage = () => {
  const userInLocalStorage = localStorage.getItem('user')

  if (!userInLocalStorage) {
    localStorage.setItem('user', JSON.stringify(null))
  }
}

export {
  initLocalStorage,
  AuthProvider,
  AuthRoute,
  useAuth,
};