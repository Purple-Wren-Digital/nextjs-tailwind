import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '../firebase/config';

export const AuthContext = createContext({
  user: null as User | null,
  isStayedLoggedIn: false,
  setIsStayedLoggedIn: (isStayedLoggedIn: boolean) => {},
  isAuthLoading: true,
});

export const useAuthContext = () => useContext(AuthContext);

type Props = {
  children: ReactNode;
};

type AuthContext = {
  user: User | null;
  isStayedLoggedIn: boolean;
  setIsStayedLoggedIn: (value: boolean) => void;
  isAuthLoading: boolean;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isStayedLoggedIn, setIsStayedLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        if (isStayedLoggedIn) {
          try {
            await setPersistence(auth, browserLocalPersistence);
          } catch (error) {
            console.error('Error setting persistence:', error);
          }
        }
        setUser(authUser);
      } else {
        setUser(null);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, [isStayedLoggedIn]);

  const value: AuthContext = {
    user,
    isStayedLoggedIn,
    setIsStayedLoggedIn,
    isAuthLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
