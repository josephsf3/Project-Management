import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL,
});

export const fetchDashboardData = async (token: string) => {
  const res = await api.get("/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
