import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole, Toast } from '@/types';
import * as authService from '@/services/authService';

interface AppContextValue {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => User;
  register: (name: string, email: string, password: string, role: UserRole) => User;
  demoLogin: () => User;
  logout: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = 'toast-' + Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const login = (email: string, password: string, role: UserRole) => {
    const u = authService.login(email, password, role);
    setUser(u);
    return u;
  };

  const register = (name: string, email: string, password: string, role: UserRole) => {
    const u = authService.register(name, email, password, role);
    setUser(u);
    return u;
  };

  const demoLogin = () => {
    const u = authService.demoLogin();
    setUser(u);
    return u;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{ user, login, register, demoLogin, logout, toasts, showToast, removeToast }}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
