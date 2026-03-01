// src/types/dashboard.ts
import { LucideIcon } from "lucide-react";
// Individual stat card
export interface Stat {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
}

// Individual project
export interface DashProject {
  _id: string;
  name: string;
  progress: number; // percentage 0-100
  dueDate: string; // formatted date string
  teamSize: number; // number of team members
  status: "on-track" | "at-risk" | "completed" | "delayed";
}

// Individual task
export interface DashTask {
  _id: string;
  title: string;
  assignee: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "progress" | "done";
  dueDate: string; // formatted date string
}

