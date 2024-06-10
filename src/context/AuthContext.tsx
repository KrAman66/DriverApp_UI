import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { SECURE_STORE_KEYS, dispatchInstance, driverAuthInstance, driverBackendInstance, setLogoutFunction } from '../config/api';

interface AuthContextProps {
  authToken: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(SECURE_STORE_KEYS.authToken);
        if (token) {
          setAuthToken(token);
        }
      } catch (error) {
        console.error('Error loading auth token', error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (token: string) => {
    try {
      await SecureStore.setItemAsync(SECURE_STORE_KEYS.authToken, token);
      dispatchInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      driverAuthInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      driverBackendInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;  
      setAuthToken(token);
     } catch (error) {
      console.error('Error storing the auth token', error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.authToken);
      delete dispatchInstance.defaults.headers.common['Authorization'];
      delete driverAuthInstance.defaults.headers.common['Authorization'];
      delete driverBackendInstance.defaults.headers.common['Authorization'];
      setAuthToken(null);    
    } catch (error) {
      console.error('Error removing the auth token', error);
    }
  };

  setLogoutFunction(logout);

  return (
    <AuthContext.Provider value={{ authToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
