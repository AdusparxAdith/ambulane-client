import {
  createContext, useContext, useState, useEffect,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import config from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${config.APP_SERVER_URL}/user/verify`, {
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
  }, [navigate]);

  useEffect(() => {
    if (user) {
      const newSocket = io(config.SOCKET_SERVER_URL, {
        withCredentials: true,
      });
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to socket server');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  const login = async (username, password) => {
    const response = await axios.post(
      `${config.APP_SERVER_URL}/user/login`,
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
      await axios.get(`${config.APP_SERVER_URL}/user/logout`, {
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
    socket,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
