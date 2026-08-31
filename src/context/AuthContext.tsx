import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, UserRole } from '../types';
import { store } from '../data/store';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface AuthContextType {
  currentUser: Profile | null;
  currentRole: UserRole | null;
  isDemoMode: boolean;
  loginAsDemoRole: (role: UserRole) => void;
  switchRole: (role: UserRole) => void;
  logout: () => void;
  updateCurrentUserProfile: (updates: Partial<Profile>) => void;
  resetDemoData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_EMAILS: Record<UserRole, string> = {
  ATHLETE: 'athlete@demo.khelsetu.in',
  ORGANIZER: 'organizer@demo.khelsetu.in',
  VERIFIER: 'verifier@demo.khelsetu.in',
  SCOUT: 'scout@demo.khelsetu.in',
  ADMIN: 'admin@demo.khelsetu.in'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('khelsetu_active_role') as UserRole;
    return saved || 'ATHLETE';
  });

  const [currentUser, setCurrentUser] = useState<Profile | null>(() => {
    const email = DEMO_EMAILS[currentRole];
    return store.getProfileByEmail(email) || store.getProfileByRole(currentRole) || null;
  });

  const [isDemoMode] = useState<boolean>(!isSupabaseConfigured);

  // Sync current user when role changes or store updates
  useEffect(() => {
    const syncUser = () => {
      const email = DEMO_EMAILS[currentRole];
      const profile = store.getProfileByEmail(email) || store.getProfileByRole(currentRole) || null;
      setCurrentUser(profile);
    };

    syncUser();
    const unsubscribe = store.subscribe(syncUser);
    return () => unsubscribe();
  }, [currentRole]);

  const loginAsDemoRole = (role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem('khelsetu_active_role', role);
    const email = DEMO_EMAILS[role];
    const profile = store.getProfileByEmail(email) || store.getProfileByRole(role) || null;
    setCurrentUser(profile);
  };

  const switchRole = (role: UserRole) => {
    loginAsDemoRole(role);
  };

  const logout = () => {
    // In demo mode, fallback to viewing as Public (or default Athlete)
    loginAsDemoRole('ATHLETE');
    if (supabase) {
      supabase.auth.signOut();
    }
  };

  const updateCurrentUserProfile = (updates: Partial<Profile>) => {
    if (!currentUser) return;
    const updated = store.updateProfile(currentUser.id, updates);
    setCurrentUser(updated);
  };

  const resetDemoData = () => {
    store.resetToDefault();
    loginAsDemoRole(currentRole);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        isDemoMode,
        loginAsDemoRole,
        switchRole,
        logout,
        updateCurrentUserProfile,
        resetDemoData
      }}
    >
      {children}
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
