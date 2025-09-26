import { ReactNode, useState, useEffect } from "react";
import { AuthContext, Role } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(null);

  // Load token and role from localStorage when app starts
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedRole = localStorage.getItem("authRole") as Role | null;
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);

  // Save login info
  const login = (jwt: string, userRole: Role) => {
    setToken(jwt);
    setRole(userRole);
    localStorage.setItem("authToken", jwt);
    localStorage.setItem("authRole", userRole || "");
  };

  // Clear login info
  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authRole");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
