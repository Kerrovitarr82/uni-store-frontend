// в AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // При загрузке пытаемся восстановить пользователя из localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      loadUser(storedUserId);
    } else {
      setLoading(false);
    }
  }, []);

  async function loadUser(userId) {
    try {
      const userData = await api.getUserById(userId);
      setUser(userData);
    } catch (e) {
      console.error('Ошибка загрузки пользователя', e);
      localStorage.removeItem('userId');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    setLoading(true);
    try {
      // делаем POST /auth/login
      const userData = await api.login(email, password);

      // сохраняем userId для восстановления сессии
      localStorage.setItem('userId', userData.id); // либо userData.id, в зависимости от поля
      setUser(userData);
    } catch (err) {
      setUser(null);
      localStorage.removeItem('userId');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('userId');
    // Можно вызвать logout на бекенде, если есть
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
