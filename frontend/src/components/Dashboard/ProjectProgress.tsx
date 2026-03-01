import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { DashProject } from "@/types/dashboard";
import { fetchDashboardProjects } from "@/services/api";



export default function ProjectProgress() {

  const [projects, setProjects] = useState<DashProject[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const token = auth?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const getProjects = async () => {
      try {
        const data = await fetchDashboardProjects(token);
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, [token, navigate]);


  const getStatusBadge = (status: DashProject['status']) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    const colorClasses = {
      'completed': 'bg-success/10 text-success',
      'active': 'bg-accent/10 text-accent',
      'on-hold': 'bg-destructive/10 text-destructive'
    };

    return `${baseClasses} ${colorClasses[status]}`;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="glass-card p-6 fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-6">Project Progress</h3>

      <div className="space-y-4">

        {projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects found.</p>
        ) : (projects.map((project) => (
          <div key={project._id} className="p-4 rounded-xl bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">{project.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Due {" - "} {new Date(project.dueDate).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })} • {project.teamSize} members
                </p>
              </div>
              <span className={getStatusBadge(project.status)}>
                {project.status.replace('-', ' ')}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
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
          </div>
        )))}
      </div>
    </div>
  );
}