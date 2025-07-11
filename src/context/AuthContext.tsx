'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange, getUserData } from '@/lib/auth';
import { User as AdminUser } from '@/lib/models';

// Define context type
type AuthContextType = {
  user: User | null;
  userData: AdminUser | null;
  loading: boolean;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
});

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // If user is logged in, fetch their data from Firestore
        const adminData = await getUserData(firebaseUser.uid);
        setUserData(adminData);
        
        // Store auth state in localStorage for persistence
        localStorage.setItem('adminAuth', 'true');
      } else {
        // Clear user data when logged out
        setUserData(null);
        localStorage.removeItem('adminAuth');
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);