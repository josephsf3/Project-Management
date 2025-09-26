import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: ("Admin" | "ProjectManager" | "Developer")[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { token, role } = useContext(AuthContext);

  // Not logged in
  if (!token) return <Navigate to="/login" replace />;

  // Role-based access control
  if (allowedRoles && !allowedRoles.includes(role!)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
