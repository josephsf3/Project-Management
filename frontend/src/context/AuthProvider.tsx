// AuthProvider.tsx
import { ReactNode, useState, useEffect } from "react";
import { AuthContext, Role } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true); // 👈 new state

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedRole = localStorage.getItem("authRole") as Role | null;

    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
    }

    setLoading(false); // 👈 finished loading
  }, []);

  const login = (jwt: string, userRole: Role) => {
    setToken(jwt);
    setRole(userRole);
    localStorage.setItem("authToken", jwt);
    localStorage.setItem("authRole", userRole || "");
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authRole");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
