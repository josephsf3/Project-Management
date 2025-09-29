// // src/pages/Dashboard.tsx

// import { useContext } from "react";
// import { AuthContext } from "@/context/AuthContext";
// import { useQuery } from "@tanstack/react-query";
// import StatsCard from "@/components/Dashboard/StatsCard";
// import ProjectProgress from "@/components/Dashboard/ProjectProgress";
// import TaskBoard from "@/components/Dashboard/TaskBoard";
// import { fetchDashboardData } from "@/services/api";
// import { DashboardData } from "@/types/dashboard";

// export default function Dashboard() {
//   const { token } = useContext(AuthContext);

//   const { data, isLoading, error } = useQuery<DashboardData, Error>({
//     queryKey: ["dashboardData"],
//     queryFn: () => fetchDashboardData(token ?? ""),
//     enabled: !!token,
//   });

//   console.log(data, isLoading, error);

//   if (isLoading) {
//     return <p>Loading dashboard...</p>;
//   }

//   if (error || !data) {
//     return <p>Failed to load dashboard.</p>;
//   }

//   const { stats, projects, tasks, userName } = data;

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="glass-card p-6 fade-in">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-foreground">
//               Welcome back, {userName}!
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Here's what's happening with your projects today.
//             </p>
//           </div>
//           <div className="hidden md:block">
//             <div className="text-right">
//               <p className="text-sm text-muted-foreground">Today</p>
//               <p className="text-lg font-semibold text-foreground">
//                 {new Date().toLocaleDateString("en-US", {
//                   weekday: "long",
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <StatsCard
//             key={stat.title}
//             title={stat.title}
//             value={stat.value}
//             change={stat.change}
//             changeType={stat.changeType}
//             icon={stat.icon}
//           />
//         ))}
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-1">
//           <ProjectProgress projects={projects} />
//         </div>
//         <div className="lg:col-span-2">
//           <TaskBoard tasks={tasks} />
//         </div>
//       </div>
//     </div>
//   );
// }





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
          <ProjectProgress />
        </div>
        
        {/* Task Board - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <TaskBoard />
        </div>
      </div>
    </div>
  );
}