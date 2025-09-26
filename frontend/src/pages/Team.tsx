import { useState } from "react";
import { Plus, Mail, Phone, MoreHorizontal, Shield, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'pm' | 'developer';
  avatar: string;
  status: 'online' | 'offline' | 'away';
  projects: number;
  tasks: number;
  joinDate: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "admin",
    avatar: "JD",
    status: "online",
    projects: 8,
    tasks: 24,
    joinDate: "2023-01-15"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "pm",
    avatar: "SJ",
    status: "online",
    projects: 6,
    tasks: 18,
    joinDate: "2023-02-20"
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@company.com",
    role: "developer",
    avatar: "MC",
    status: "away",
    projects: 4,
    tasks: 22,
    joinDate: "2023-03-10"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@company.com",
    role: "developer",
    avatar: "ED",
    status: "online",
    projects: 3,
    tasks: 16,
    joinDate: "2023-04-05"
  },
  {
    id: "5",
    name: "Alex Rodriguez",
    email: "alex@company.com",
    role: "pm",
    avatar: "AR",
    status: "offline",
    projects: 5,
    tasks: 20,
    joinDate: "2023-05-12"
  }
];

export default function Team() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'pm' | 'developer'>('all');

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: TeamMember['role']) => {
    const variants = {
      'admin': 'bg-destructive/10 text-destructive',
      'pm': 'bg-accent/10 text-accent',
      'developer': 'bg-success/10 text-success'
    };
    const labels = {
      'admin': 'Admin',
      'pm': 'Project Manager',
      'developer': 'Developer'
    };
    return { class: variants[role], label: labels[role] };
  };

  const getStatusIndicator = (status: TeamMember['status']) => {
    const colors = {
      'online': 'bg-success',
      'away': 'bg-warning',
      'offline': 'bg-muted-foreground'
    };
    return colors[status];
  };

  const roleOptions = [
    { value: 'all' as const, label: 'All Roles' },
    { value: 'admin' as const, label: 'Admin' },
    { value: 'pm' as const, label: 'Project Manager' },
    { value: 'developer' as const, label: 'Developer' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Team</h1>
            <p className="text-muted-foreground">Manage team members and their roles</p>
          </div>
          <Button className="btn-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 slide-up">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/30 border-white/20"
            />
          </div>
          
          <div className="flex gap-2">
            {roleOptions.map((option) => (
              <Button
                key={option.value}
                variant={filterRole === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRole(option.value)}
                className={filterRole === option.value ? 'btn-gradient' : 'bg-white/30 border-white/20'}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => {
          const roleBadge = getRoleBadge(member.role);
          return (
            <div key={member.id} className="glass-card-interactive p-6 slide-up">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{member.avatar}</span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusIndicator(member.status)} rounded-full border-2 border-white`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <Badge className={roleBadge.class}>
                  {member.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                  {member.role === 'pm' && <User className="w-3 h-3 mr-1" />}
                  {member.role === 'developer' && <Settings className="w-3 h-3 mr-1" />}
                  {roleBadge.label}
                </Badge>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Projects</span>
                    <p className="font-medium text-foreground">{member.projects}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tasks</span>
                    <p className="font-medium text-foreground">{member.tasks}</p>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Joined {new Date(member.joinDate).toLocaleDateString()}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-white/30 border-white/20">
                    <Mail className="w-3 h-3 mr-1" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-white/30 border-white/20">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Stats */}
      <div className="glass-card p-6 scale-in">
        <h3 className="text-lg font-semibold text-foreground mb-4">Team Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {teamMembers.filter(m => m.role === 'admin').length}
            </div>
            <div className="text-sm text-muted-foreground">Admins</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {teamMembers.filter(m => m.role === 'pm').length}
            </div>
            <div className="text-sm text-muted-foreground">Project Managers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {teamMembers.filter(m => m.role === 'developer').length}
            </div>
            <div className="text-sm text-muted-foreground">Developers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {teamMembers.filter(m => m.status === 'online').length}
            </div>
            <div className="text-sm text-muted-foreground">Online Now</div>
          </div>
        </div>
      </div>
    </div>
  );
}