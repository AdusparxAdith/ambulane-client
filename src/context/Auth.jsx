import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/verify', {
          withCredentials: true,
        });
        if (response.statusText === 'OK') {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setUser(response.data.user);
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (username, password) => {
    const response = await axios.post(
      'http://localhost:8080/user/login',
      { username, password },
      { withCredentials: true },
    );
    if (!response.statusText === 'OK') {
      throw new Error('Invalid credentials');
    }
    localStorage.setItem('user', JSON.stringify(response.data.user));
    setUser(response.data.user);
  };

  const logout = async () => {
    try {
      await axios.get('http://localhost:8080/user/logout', {
        withCredentials: true,
      });
      localStorage.setItem('user', null);
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

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
