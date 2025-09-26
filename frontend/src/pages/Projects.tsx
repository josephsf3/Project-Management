import { useState } from "react";
import { Plus, Search, Calendar, Users, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  dueDate: string;
  teamSize: number;
  status: 'active' | 'completed' | 'on-hold';
  priority: 'high' | 'medium' | 'low';
}

const projects: Project[] = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Modern shopping platform with AI-powered recommendations",
    progress: 78,
    dueDate: "2024-12-15",
    teamSize: 6,
    status: "active",
    priority: "high"
  },
  {
    id: "2",
    name: "Mobile App Redesign",
    description: "Complete UI/UX overhaul for better user experience",
    progress: 45,
    dueDate: "2025-01-10",
    teamSize: 4,
    status: "active",
    priority: "medium"
  },
  {
    id: "3",
    name: "API Integration",
    description: "Third-party service integrations and webhook setup",
    progress: 92,
    dueDate: "2024-11-30",
    teamSize: 3,
    status: "active",
    priority: "high"
  },
  {
    id: "4",
    name: "Analytics Dashboard",
    description: "Real-time analytics and reporting dashboard",
    progress: 100,
    dueDate: "2024-11-15",
    teamSize: 2,
    status: "completed",
    priority: "medium"
  }
];

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'on-hold'>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Project['status']) => {
    const variants = {
      'active': 'bg-accent/10 text-accent',
      'completed': 'bg-success/10 text-success',
      'on-hold': 'bg-warning/10 text-warning'
    };
    return variants[status];
  };

  const getPriorityBadge = (priority: Project['priority']) => {
    const variants = {
      'high': 'bg-destructive/10 text-destructive',
      'medium': 'bg-warning/10 text-warning',
      'low': 'bg-success/10 text-success'
    };
    return variants[priority];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground">Manage and track your project portfolio</p>
          </div>
          <Button className="btn-gradient">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 slide-up">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/30 border-white/20"
            />
          </div>
          
          <div className="flex gap-2">
            {(['all', 'active', 'completed', 'on-hold'] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className={filterStatus === status ? 'btn-gradient' : 'bg-white/30 border-white/20'}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="glass-card-interactive p-6 slide-up">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium text-foreground">{project.progress}%</span>
                </div>
                <div className="progress-glass h-2">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Meta info */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(project.dueDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-4 h-4 mr-1" />
                  {project.teamSize}
                </div>
              </div>

              {/* Badges */}
              <div className="flex gap-2">
                <Badge className={getStatusBadge(project.status)}>
                  {project.status.replace('-', ' ')}
                </Badge>
                <Badge className={getPriorityBadge(project.priority)}>
                  {project.priority}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}