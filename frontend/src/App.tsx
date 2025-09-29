import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";

const queryClient = new QueryClient();

// Role-based access wrapper
const RoleRoute = ({ allowedRoles, children }: { allowedRoles: string[], children: JSX.Element }) => {
  const auth = useContext(AuthContext);

  if (!auth || !auth.token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(auth.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            {/* Dashboard Home */}
            <Route index element={<Dashboard />} />

            {/* Projects - Admin & PM */}
            <Route path="projects" element={
              <RoleRoute allowedRoles={["Admin", "ProjectManager", "Developer"]}>
                <Projects />
              </RoleRoute>
            } />

            {/* Tasks - Admin & Developer */}
            <Route path="tasks" element={
              <RoleRoute allowedRoles={["Admin","ProjectManager", "Developer"]}>
                <Tasks />
              </RoleRoute>
            } />

            {/* Analytics - Admin only */}
            <Route path="analytics" element={
              <RoleRoute allowedRoles={["Admin"]}>
                <Analytics />
              </RoleRoute>
            } />

            {/* Team - Admin & PM */}
            <Route path="team" element={
              <RoleRoute allowedRoles={["Admin", "ProjectManager"]}>
                <Team />
              </RoleRoute>
            } />

            {/* Settings - Admin only */}
            <Route path="settings" element={
              <RoleRoute allowedRoles={["Admin"]}>
                <Settings />
              </RoleRoute>
            } />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
