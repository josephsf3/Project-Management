import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'progress' | 'done';
  dueDate: string;
}

interface TaskBoardProps {
  tasks: Task[];
}

export default function TaskBoard({ tasks }: TaskBoardProps) {
  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as const },
    { id: 'progress', title: 'In Progress', status: 'progress' as const },
    { id: 'done', title: 'Done', status: 'done' as const }
  ];

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'medium': return <Clock className="w-4 h-4 text-warning" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-success" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-destructive';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-success';
    }
  };

  return (
    <div className="glass-card p-6 fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-6">Task Board</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">{column.title}</h4>
              <span className="text-sm text-muted-foreground bg-white/30 px-2 py-1 rounded-full">
                {tasks.filter(task => task.status === column.status).length}
              </span>
            </div>
            
            <div className="space-y-3">
              {tasks
                .filter(task => task.status === column.status)
                .map((task) => (
                  <div 
                    key={task.id}
                    className={`glass-card-interactive p-4 border-l-4 ${getPriorityColor(task.priority)} slide-up`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-foreground text-sm">{task.title}</h5>
                      {getPriorityIcon(task.priority)}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{task.assignee}</span>
                      <span>{task.dueDate}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}