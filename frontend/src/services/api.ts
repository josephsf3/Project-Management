import { Project } from "@/types/projects";
import { Task } from "@/types/tasks";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4090";

export const api = axios.create({
  baseURL: API_URL,
});


export const fetchDashboardProjects = async (token: string) => {
  const res = await api.get("/api/projects/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
export const fetchDashboardTasks = async (token: string) => {
  const res = await api.get("/api/tasks/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
export const fetchProjects = async (token: string) => {
  const res = await api.get<Project[]>("/api/projects", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
export const fetchTasks = async (token: string) => {
  const res = await api.get<Task[]>("/api/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
export const addProject = async (token: string) => {
  const res = await api.post("/api/new-project", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
export const addTasks = async (token: string) => {
  const res = await api.post("/api/new-task", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
