import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';

import { getToken, setToken, removeToken } from '../utils/auth';
import { getCurrentUser } from '../services/authServices/authApi';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties here as needed
}

interface JwtPayload {
  exp: number;
  // Add other JWT payload properties if necessary
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  login: (token: string, userData: User, rememberMe: boolean) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = getToken();
      console.log('AuthContext: Retrieved token from storage:', token);
      if (!token) {
        console.log('AuthContext: No token found');
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;
        console.log('AuthContext: Decoded token exp:', decoded.exp, 'Current time:', currentTime);
        if (decoded.exp < currentTime) {
          console.log('AuthContext: Token expired');
          removeToken();
          setUser(null);
          setLoading(false);
          return;
        }

        const currentUser = await getCurrentUser();
        console.log('AuthContext: Fetched current user:', currentUser);
        setUser(currentUser);
        setLoading(false);
      } catch (err) {
        console.error('AuthContext: Token verification failed:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        removeToken();
        setUser(null);
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = (token: string, userData: User, rememberMe: boolean) => {
    setToken(token, rememberMe);
    setUser(userData);
  };

  const logout = () => {
    removeToken();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
