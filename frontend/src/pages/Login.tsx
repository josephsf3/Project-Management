import { useState } from "react";
import { Eye, EyeOff, FolderKanban, ArrowLeft, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

// Mock user database for demonstration
const mockUsers = {
  'admin@company.com': { password: 'admin123', role: 'admin', name: 'Admin User' },
  'pm@company.com': { password: 'pm123', role: 'pm', name: 'Project Manager' },
  'dev@company.com': { password: 'dev123', role: 'developer', name: 'Developer' }
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const navigate = useNavigate();

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with role-based redirection
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials against mock database
      const user = mockUsers[formData.email as keyof typeof mockUsers];
      
      if (!user || user.password !== formData.password) {
        setErrors({ general: "Invalid email or password" });
        return;
      }
      
      // Store user data (in real app, this would be JWT tokens)
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        role: user.role,
        name: user.name
      }));
      
      // Role-based redirection
      switch (user.role) {
        case 'admin':
          navigate('/dashboard');
          break;
        case 'pm':
          navigate('/dashboard/projects');
          break;
        case 'developer':
          navigate('/dashboard/tasks');
          break;
        default:
          navigate('/dashboard');
      }
      
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear specific field error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const quickLogin = (email: string, password: string) => {
    setFormData({ email, password, rememberMe: false });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Back to landing page */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8 fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl mb-4">
            <FolderKanban className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your dashboard</p>
        </div>

        {/* Login form */}
        <div className="glass-card p-8 scale-in">
          {/* Error Alert */}
          {errors.general && (
            <Alert className="mb-6 bg-destructive/10 border-destructive/20">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                {errors.general}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`bg-white/30 border-white/20 placeholder:text-muted-foreground transition-all duration-200 focus:bg-white/40 focus:border-accent/30 ${
                  errors.email ? 'border-destructive/50 focus:border-destructive' : ''
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`bg-white/30 border-white/20 placeholder:text-muted-foreground pr-10 transition-all duration-200 focus:bg-white/40 focus:border-accent/30 ${
                    errors.password ? 'border-destructive/50 focus:border-destructive' : ''
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange('rememberMe', !!checked)}
                  disabled={isLoading}
                />
                <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                  Remember me
                </Label>
              </div>
              <button 
                type="button"
                className="text-sm text-accent hover:text-accent/80 transition-colors"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full btn-gradient transition-all duration-200 hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button className="text-accent hover:text-accent/80 transition-colors font-medium">
                Request Access
              </button>
            </p>
          </div>

          {/* Quick login demo credentials */}
          <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/10">
            <h4 className="text-sm font-medium text-foreground mb-3">Quick Login (Demo)</h4>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => quickLogin('admin@company.com', 'admin123')}
                className="w-full text-left text-xs p-2 rounded bg-white/30 hover:bg-white/40 transition-colors"
                disabled={isLoading}
              >
                <strong className="text-foreground">Admin:</strong>{" "}
                <span className="text-muted-foreground">admin@company.com</span>
              </button>
              <button
                type="button"
                onClick={() => quickLogin('pm@company.com', 'pm123')}
                className="w-full text-left text-xs p-2 rounded bg-white/30 hover:bg-white/40 transition-colors"
                disabled={isLoading}
              >
                <strong className="text-foreground">Project Manager:</strong>{" "}
                <span className="text-muted-foreground">pm@company.com</span>
              </button>
              <button
                type="button"
                onClick={() => quickLogin('dev@company.com', 'dev123')}
                className="w-full text-left text-xs p-2 rounded bg-white/30 hover:bg-white/40 transition-colors"
                disabled={isLoading}
              >
                <strong className="text-foreground">Developer:</strong>{" "}
                <span className="text-muted-foreground">dev@company.com</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}