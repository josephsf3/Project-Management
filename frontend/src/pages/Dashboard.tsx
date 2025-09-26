// src/pages/Dashboard.tsx

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "@/components/Dashboard/StatsCard";
import ProjectProgress from "@/components/Dashboard/ProjectProgress";
import TaskBoard from "@/components/Dashboard/TaskBoard";
import { fetchDashboardData } from "@/services/api";
import { DashboardData } from "@/types/dashboard";

export default function Dashboard() {
  const { token } = useContext(AuthContext);

  const { data, isLoading, error } = useQuery<DashboardData, Error>({
    queryKey: ["dashboardData"],
    queryFn: () => fetchDashboardData(token ?? ""),
    enabled: !!token,
  });

  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  if (error || !data) {
    return <p>Failed to load dashboard.</p>;
  }

  const { stats, projects, tasks, userName } = data;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="glass-card p-6 fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {userName}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your projects today.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-lg font-semibold text-foreground">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProjectProgress projects={projects} />
        </div>
        <div className="lg:col-span-2">
          <TaskBoard tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
