import { useEffect, useState } from "react";
import { Plus, Filter, Calendar, User, Flag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import axios from "axios";

export interface Task {
  _id: string;
  title: string;
  description: string;
  assignee: string;
  project: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'progress' | 'review' | 'done';
  dueDate: string;
  createdAt: string;
}


export default function Tasks() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | Task['status']>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    project: '',
    priority: 'medium' as Task['priority'],
    status: 'todo' as Task['status'],
    dueDate: ''
  });

  useEffect(() => {
    async function getTasks() {
      const response = await axios.get('http://localhost:4090/api/tasks/all');
      setTasks(response.data);
    }
    getTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: Task['status']) => {
    const variants = {
      'todo': 'bg-muted text-muted-foreground',
      'progress': 'bg-accent/10 text-accent',
      'review': 'bg-warning/10 text-warning',
      'done': 'bg-success/10 text-success'
    };
    return variants[status];
  };

  const getPriorityColor = (priority: Task['priority']) => {
    const colors = {
      'high': 'text-destructive',
      'medium': 'text-warning',
      'low': 'text-success'
    };
    return colors[priority];
  };

  const statusOptions = [
    { value: 'all' as const, label: 'All Tasks' },
    { value: 'todo' as const, label: 'To Do' },
    { value: 'progress' as const, label: 'In Progress' },
    { value: 'review' as const, label: 'Review' },
    { value: 'done' as const, label: 'Done' }
  ];

  const handleCreateTask = async () => {
    try {
      const response = await axios.post('http://localhost:4090/api/tasks', newTask);
      setTasks(prev => [...prev, response.data]);
      setShowModal(false);
      setNewTask({
        title: '',
        description: '',
        assignee: '',
        project: '',
        priority: 'medium',
        status: 'todo',
        dueDate: ''
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
            <p className="text-muted-foreground">Track and manage all project tasks</p>
          </div>
          <Button className="btn-gradient" onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <X className="absolute top-4 right-4 w-5 h-5 cursor-pointer" onClick={() => setShowModal(false)} />
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Title"
                value={newTask.title}
                onChange={e => setNewTask({ ...newTask, title: e.target.value })}
              />
              <Input
                placeholder="Description"
                value={newTask.description}
                onChange={e => setNewTask({ ...newTask, description: e.target.value })}
              />
              <Input
                placeholder="Assignee"
                value={newTask.assignee}
                onChange={e => setNewTask({ ...newTask, assignee: e.target.value })}
              />
              <Input
                placeholder="Project"
                value={newTask.project}
                onChange={e => setNewTask({ ...newTask, project: e.target.value })}
              />
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
              <div className="flex gap-2">
                <select
                  value={newTask.priority}
                  onChange={e => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                  className="flex-1 border rounded px-2 py-1"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={newTask.status}
                  onChange={e => setNewTask({ ...newTask, status: e.target.value as Task['status'] })}
                  className="flex-1 border rounded px-2 py-1"
                >
                  <option value="todo">To Do</option>
                  <option value="progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <Button className="btn-gradient mt-3" onClick={handleCreateTask}>
                Create Task
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="glass-card p-6 slide-up">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/30 border-white/20"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {statusOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedStatus === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus(option.value)}
                className={selectedStatus === option.value ? 'btn-gradient' : 'bg-white/30 border-white/20'}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task._id} className="glass-card-interactive p-6 slide-up">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{task.title}</h3>
                  <Flag className={`w-4 h-4 ml-2 ${getPriorityColor(task.priority)}`} />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{task.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {task.assignee}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <span className="text-accent font-medium">{task.project}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge className={getStatusBadge(task.status)}>
                  {task.status === 'progress' ? 'In Progress' :
                    task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </Badge>
                <Button variant="outline" size="sm" className="bg-white/30 border-white/20">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}