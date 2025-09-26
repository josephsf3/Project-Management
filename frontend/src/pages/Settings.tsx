import { User, Bell, Lock, Palette, Globe, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and application settings</p>
          </div>
          <Button className="btn-gradient">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="glass-card p-6 slide-up">
          <h3 className="font-semibold text-foreground mb-4">Settings</h3>
          <nav className="space-y-2">
            {[
              { icon: User, label: "Profile", active: true },
              { icon: Bell, label: "Notifications" },
              { icon: Lock, label: "Security" },
              { icon: Palette, label: "Appearance" },
              { icon: Globe, label: "Language" },
              { icon: Shield, label: "Privacy" }
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  item.active 
                    ? 'bg-accent/10 text-accent border border-accent/20' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="glass-card p-6 scale-in">
            <h3 className="text-lg font-semibold text-foreground mb-4">Profile Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">JD</span>
                </div>
                <div>
                  <Button variant="outline" size="sm" className="bg-white/30 border-white/20">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    defaultValue="John" 
                    className="bg-white/30 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    defaultValue="Doe" 
                    className="bg-white/30 border-white/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue="john@company.com" 
                  className="bg-white/30 border-white/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input 
                  id="role" 
                  defaultValue="Project Manager" 
                  disabled 
                  className="bg-white/20 border-white/20"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass-card p-6 scale-in">
            <h3 className="text-lg font-semibold text-foreground mb-4">Notifications</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive project updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator className="bg-white/20" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Desktop Notifications</p>
                  <p className="text-xs text-muted-foreground">Show browser notifications for important updates</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator className="bg-white/20" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Task Reminders</p>
                  <p className="text-xs text-muted-foreground">Get reminded about upcoming deadlines</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator className="bg-white/20" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Weekly Reports</p>
                  <p className="text-xs text-muted-foreground">Receive weekly productivity summaries</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="glass-card p-6 scale-in">
            <h3 className="text-lg font-semibold text-foreground mb-4">Security</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                  id="currentPassword" 
                  type="password" 
                  placeholder="Enter current password"
                  className="bg-white/30 border-white/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    placeholder="Enter new password"
                    className="bg-white/30 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirm new password"
                    className="bg-white/30 border-white/20"
                  />
                </div>
              </div>

              <Button className="btn-gradient">
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}