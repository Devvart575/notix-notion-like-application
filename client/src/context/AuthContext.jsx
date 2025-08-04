import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from "react-router-dom"
import { apiCall } from '../services/api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiCall('/users/me')
        .then(setUser)
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const signup = async (username, email, password) => {
    const data = await apiCall('/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = (onLogoutComplete) => {
  localStorage.removeItem('token');
  
  // Delay setting user to null, so navigate runs first
  setTimeout(() => {
    setUser(null); // this triggers ProtectedRoute
    if (onLogoutComplete) onLogoutComplete();
  }, 0);
};

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};