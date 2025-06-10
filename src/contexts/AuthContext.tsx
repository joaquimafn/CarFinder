import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn as apiSignIn, SignInResponse } from '../services/api';

interface User {
  id: string;
  name: string;
  token: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (user: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  async function loadStoredData() {
    try {
      const [storedUser, storedToken] = await Promise.all([
        AsyncStorage.getItem('@AuthData:user'),
        AsyncStorage.getItem('@AuthData:token'),
      ]);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (user: string, password: string) => {
    try {
      const response = await apiSignIn({ user, password });
      
      const { user: userData } = response;

      await Promise.all([
        AsyncStorage.setItem('@AuthData:user', JSON.stringify(userData)),
        AsyncStorage.setItem('@AuthData:token', userData.token),
      ]);

      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('@AuthData:user'),
        AsyncStorage.removeItem('@AuthData:token'),
      ]);
      setUser(null);
    } catch (error) {
      throw new Error('Error signing out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
} 