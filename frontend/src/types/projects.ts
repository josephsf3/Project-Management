// Individual project type
export interface Project {
  _id: string;
  name: string;
  description: string;
  progress: number; // 0-100
  dueDate: string; // ISO date string
  team?: string[];
  teamSize: number;
  status: "active" | "completed" | "on-hold";
  priority: "high" | "medium" | "low";
}

// For future API responses, e.g., paginated list
export interface ProjectsData {
  projects: Project[];
}
