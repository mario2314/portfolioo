import { createContext, useState, useEffect, useCallback } from 'react';
import api, { setAccessToken, setUnauthorizedHandler } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // tetap lanjut clear state lokal walau request gagal
    }
    setAccessToken(null);
    setAdmin(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setAccessToken(null);
      setAdmin(null);
    });
  }, []);

  useEffect(() => {
    async function restoreSession() {
      try {
        const refreshRes = await api.post('/auth/refresh');
        setAccessToken(refreshRes.data.data.accessToken);
        const meRes = await api.get('/auth/me');
        setAdmin(meRes.data.data);
      } catch {
        setAccessToken(null);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setAccessToken(res.data.data.accessToken);
    setAdmin(res.data.data.admin);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
