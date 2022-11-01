import React, {
  createContext, useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/use-local-storage.hook';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [currentUser, storeUser, clearStoredUser] = useLocalStorage('arquisis-user');
  const navigate = useNavigate();

  const handleUserLogin = (accessToken) => {
    const user = jwtDecode(accessToken);
    user.accessToken = accessToken;
    storeUser(user);
    navigate('/');
  };

  const handleUserLogout = () => {
    clearStoredUser(null);
    navigate('/');
  };

  const userStatus = useMemo(
    () => ({ currentUser, handleUserLogin, handleUserLogout }),
    [currentUser, handleUserLogin, handleUserLogout],
  );

  return (
    <AuthContext.Provider value={userStatus}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;