import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  userId: string | null;
  isAdmin: boolean;
  token: string | null;
  setUser: (user: string | null) => void;
  setUserId: (userId: string | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userId: null,
  isAdmin: false,
  token: null,
  setUser: () => { },
  setUserId: () => { },
  setIsAdmin: () => { },
  setToken: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  // Quando o app abre, verifica se já existe sessão salva
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedUserId = localStorage.getItem("userId");
    const savedIsAdmin = localStorage.getItem("isAdmin");
    const savedToken = localStorage.getItem("token");
    if (savedUser) setUser(savedUser);
    if (savedUserId) setUserId(savedUserId);
    if (savedIsAdmin) setIsAdmin(savedIsAdmin === "true");
    if (savedToken) setToken(savedToken);
  }, []);

  // Sempre que token, userId, isAdmin ou user mudarem, salva no localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", user);
    else localStorage.removeItem("user");
    
    if (userId) localStorage.setItem("userId", userId);
    else localStorage.removeItem("userId");
    
    localStorage.setItem("isAdmin", isAdmin.toString());

    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [user, userId, isAdmin, token]);

  const logout = () => {
    setUser(null);
    setUserId(null);
    setIsAdmin(false);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, userId, isAdmin, token, setUser, setUserId, setIsAdmin, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
