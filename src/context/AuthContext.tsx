import { useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './auth.context';
import { authService } from '../services/auth.service';
import type { LoginRequest, RegisterRequest } from '../types/auth.types';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  const login = async (credentials: LoginRequest) => {
    await authService.login(credentials);
    setIsAuthenticated(true);
  };

  const register = async (data: RegisterRequest) => {
    await authService.register(data);
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};