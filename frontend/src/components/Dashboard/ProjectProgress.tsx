interface Project {
  id: string;
  name: string;
  progress: number;
  dueDate: string;
  team: number;
  status: 'on-track' | 'at-risk' | 'completed' |'delayed';
}

interface ProjectProgressProps {
  projects: Project[];
}

export default function ProjectProgress({ projects }: ProjectProgressProps) {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'on-track': return 'success';
      case 'at-risk': return 'warning';
      case 'delayed': return 'destructive';
      default: return 'muted';
    }
  };

  const getStatusBadge = (status: Project['status']) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    const colorClasses = {
      'on-track': 'bg-success/10 text-success',
      'at-risk': 'bg-warning/10 text-warning',
      'delayed': 'bg-destructive/10 text-destructive'
    };
    
    return `${baseClasses} ${colorClasses[status]}`;
  };

  return (
    <div className="glass-card p-6 fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-6">Project Progress</h3>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 rounded-xl bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">{project.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Due {project.dueDate} • {project.team} members
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
        ))}
      </div>
    </div>
  );
}