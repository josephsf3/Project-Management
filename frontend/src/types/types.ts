// src/types/dashboard.ts
export interface Stat {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ElementType;
}

export interface Project {
  id: string;
  name: string;
  progress: number;
  dueDate: string;
  team: number;
  status: "on-track" | "at-risk" | "completed";
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "progress" | "done";
  dueDate: string;
}

export interface DashboardData {
  stats: Stat[];
  projects: Project[];
  tasks: Task[];
  userName: string;
}
