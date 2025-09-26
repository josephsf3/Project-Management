import { BarChart3, FolderKanban, CheckSquare, Users, TrendingUp } from "lucide-react";
import StatsCard from "@/components/Dashboard/StatsCard";
import ProjectProgress from "@/components/Dashboard/ProjectProgress";
import TaskBoard from "@/components/Dashboard/TaskBoard";

// Mock data
const stats = [
  {
    title: "Active Projects",
    value: "12",
    change: "+2 from last month",
    changeType: "positive" as const,
    icon: FolderKanban
  },
  {
    title: "Completed Tasks",
    value: "247",
    change: "+12% from last week",
    changeType: "positive" as const,
    icon: CheckSquare
  },
  {
    title: "Team Members",
    value: "18",
    change: "+3 new hires",
    changeType: "positive" as const,
    icon: Users
  },
  {
    title: "Efficiency",
    value: "94%",
    change: "+5% improvement",
    changeType: "positive" as const,
    icon: TrendingUp
  }
];

const projects = [
  {
    id: "1",
    name: "E-commerce Platform",
    progress: 78,
    dueDate: "Dec 15, 2024",
    team: 6,
    status: "on-track" as const
  },
  {
    id: "2",
    name: "Mobile App Redesign",
    progress: 45,
    dueDate: "Jan 10, 2025",
    team: 4,
    status: "at-risk" as const
  },
  {
    id: "3",
    name: "API Integration",
    progress: 92,
    dueDate: "Nov 30, 2024",
    team: 3,
    status: "on-track" as const
  }
];

const tasks = [
  {
    id: "1",
    title: "Design user authentication flow",
    assignee: "Sarah Johnson",
    priority: "high" as const,
    status: "todo" as const,
    dueDate: "Nov 25"
  },
  {
    id: "2",
    title: "Implement payment gateway",
    assignee: "Mike Chen",
    priority: "high" as const,
    status: "progress" as const,
    dueDate: "Nov 28"
  },
  {
    id: "3",
    title: "Update user profile page",
    assignee: "Alex Rodriguez",
    priority: "medium" as const,
    status: "progress" as const,
    dueDate: "Dec 2"
  },
  {
    id: "4",
    title: "Fix responsive design issues",
    assignee: "Emily Davis",
    priority: "low" as const,
    status: "done" as const,
    dueDate: "Nov 20"
  },
  {
    id: "5",
    title: "Database optimization",
    assignee: "John Smith",
    priority: "medium" as const,
    status: "done" as const,
    dueDate: "Nov 18"
  },
  {
    id: "6",
    title: "Write API documentation",
    assignee: "Lisa Wang",
    priority: "low" as const,
    status: "todo" as const,
    dueDate: "Dec 5"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="glass-card p-6 fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, John!</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your projects today.</p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-lg font-semibold text-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress - Takes 2 columns on large screens */}
        <div className="lg:col-span-1">
          <ProjectProgress projects={projects} />
        </div>
        
        {/* Task Board - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <TaskBoard tasks={tasks} />
        </div>
      </div>
    </div>
  );
}