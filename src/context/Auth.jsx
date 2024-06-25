import {
  createContext, useContext, useState, useEffect,
} from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/user/login', { username, password });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      console.log(response);
      localStorage.setItem('user', user);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const contextValue = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
