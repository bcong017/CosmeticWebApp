import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { APP_ROLE, STORAGE_KEY } from '../variables';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, _setToken] = useState(localStorage.getItem(STORAGE_KEY.TOKEN));
  const [role, _setRole] = useState(localStorage.getItem(STORAGE_KEY.ROLE));

  const setToken = (newToken) => {
    _setToken(newToken);
  };

  const setRole = (newRole) => {
    _setRole(newRole);
  };

  const contextValue = useMemo(
    () => ({ token, setToken, role, setRole }),
    [token, role],
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem(STORAGE_KEY.TOKEN, token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem(STORAGE_KEY.TOKEN);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY.ROLE, role ?? APP_ROLE.GUEST);
  }, [role]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
