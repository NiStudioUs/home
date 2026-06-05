import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { getDB, saveDB } from '../utils/storage';

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  region: 'US' | 'UK' | 'IN';
  setRegion: (r: 'US' | 'UK' | 'IN') => void;
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem('chapter4_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [region, setRegionState] = useState<'US' | 'UK' | 'IN'>('IN');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('chapter4_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    const db = getDB();
    if (db) setRegionState(db.settings.region);
  }, []);

  useEffect(() => {
    if (themeMode === 'light') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
  }, [themeMode]);

  const login = (username: string, password: string): boolean => {
    const db = getDB();
    if (!db) return false;
    const user = db.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      sessionStorage.setItem('chapter4_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('chapter4_user');
  };

  const setRegion = (r: 'US' | 'UK' | 'IN') => {
    setRegionState(r);
    const db = getDB();
    if (db) {
      db.settings.region = r;
      saveDB(db);
    }
  };

  const toggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('chapter4_theme', next);
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, region, setRegion, themeMode, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};
