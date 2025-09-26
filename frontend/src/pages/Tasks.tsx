import { useState } from "react";
import { Plus, Filter, Calendar, User, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  project: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'progress' | 'review' | 'done';
  dueDate: string;
  createdAt: string;
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Design user authentication flow",
    description: "Create wireframes and user journey for login/signup process",
    assignee: "Sarah Johnson",
    project: "E-commerce Platform",
    priority: "high",
    status: "todo",
    dueDate: "2024-11-25",
    createdAt: "2024-11-20"
  },
  {
    id: "2",
    title: "Implement payment gateway",
    description: "Integrate Stripe payment processing with error handling",
    assignee: "Mike Chen",
    project: "E-commerce Platform",
    priority: "high",
    status: "progress",
    dueDate: "2024-11-28",
    createdAt: "2024-11-18"
  },
  {
    id: "3",
    title: "Database schema optimization",
    description: "Optimize queries and add proper indexing for better performance",
    assignee: "Alex Rodriguez",
    project: "API Integration",
    priority: "medium",
    status: "review",
    dueDate: "2024-12-02",
    createdAt: "2024-11-15"
  },
  {
    id: "4",
    title: "Mobile responsive design fixes",
    description: "Fix layout issues on mobile devices and tablets",
    assignee: "Emily Davis",
    project: "Mobile App Redesign",
    priority: "low",
    status: "done",
    dueDate: "2024-11-20",
    createdAt: "2024-11-10"
  }
];

export default function Tasks() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | Task['status']>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: Task['status']) => {
    const variants = {
      'todo': 'bg-muted text-muted-foreground',
      'progress': 'bg-accent/10 text-accent',
      'review': 'bg-warning/10 text-warning',
      'done': 'bg-success/10 text-success'
    };
    return variants[status];
  };

  const getPriorityColor = (priority: Task['priority']) => {
    const colors = {
      'high': 'text-destructive',
      'medium': 'text-warning',
      'low': 'text-success'
    };
    return colors[priority];
  };

  const statusOptions = [
    { value: 'all' as const, label: 'All Tasks' },
    { value: 'todo' as const, label: 'To Do' },
    { value: 'progress' as const, label: 'In Progress' },
    { value: 'review' as const, label: 'Review' },
    { value: 'done' as const, label: 'Done' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
            <p className="text-muted-foreground">Track and manage all project tasks</p>
          </div>
          <Button className="btn-gradient">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 slide-up">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/30 border-white/20"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {statusOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedStatus === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus(option.value)}
                className={selectedStatus === option.value ? 'btn-gradient' : 'bg-white/30 border-white/20'}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="glass-card-interactive p-6 slide-up">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{task.title}</h3>
                  <Flag className={`w-4 h-4 ml-2 ${getPriorityColor(task.priority)}`} />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {task.assignee}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <span className="text-accent font-medium">{task.project}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className={getStatusBadge(task.status)}>
                  {task.status === 'progress' ? 'In Progress' : 
                   task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </Badge>
                <Button variant="outline" size="sm" className="bg-white/30 border-white/20">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}