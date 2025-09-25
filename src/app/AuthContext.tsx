// src/context/AuthContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  user: { nombre: string } | null;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ nombre: string } | null>(null);

  const login = (name: string) => setUser({ nombre: name });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
