import { createContext } from "react";

// Roles in your system
export type Role = "Admin" | "ProjectManager" | "Developer" | null;

// Context type definition
export interface AuthContextType {
  token: string | null;
  role: Role;
  login: (token: string, role: Role) => void;
  logout: () => void;
}

// Create context with undefined default
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
