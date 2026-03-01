import { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Bell, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "./Sidebar";
import { AuthContext } from "@/context/AuthContext";
import { Task } from "@/types/tasks";
import { fetchDashboardTasks, addTasks } from "@/services/api";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    assignee: "",
    project: "",
    dueDate: "",
    priority: "medium",
    status: "todo",
    createdAt: ""
  });

  const auth = useContext(AuthContext);
  const token = auth?.token;

  // Fetch dashboard tasks
  useEffect(() => {
    if (!token) return;

    const getTasks = async () => {
      try {
        const data = await fetchDashboardTasks(token);
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    getTasks();
  }, [token]);

  const handleCreateTask = async () => {
    if (!token) return;
    try {
      await addTasks(token);
      setShowModal(false);
      setNewTask({
        _id: "",
        title: "",
        description: "",
        assignee: "",
        project: "",
        dueDate: "",
        priority: "medium",
        status: "todo",
        createdAt: ""
      });
      // Refresh tasks after creation
      const updatedTasks = await fetchDashboardTasks(token);
      setTasks(updatedTasks);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  if (!auth) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          {/* Top navigation */}
          <header className="glass-card border-b border-white/10 rounded-none">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden"
                >
                  <Menu className="w-5 h-5" />
                </Button>

                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects, tasks..."
                    className="pl-10 w-80 bg-white/30 border-white/20 placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
                </Button>

                {/* New Task */}
                <Button
                  size="sm"
                  className="btn-gradient hidden md:inline-flex"
                  onClick={() => setShowModal(true)}
                >
                  New Task
                </Button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
            {/* Example: show tasks */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Dashboard Tasks</h3>
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li key={task.title} className="p-2 border rounded">
                    <p><strong>{task.title}</strong> ({task.status})</p>
                    <p>Assignee: {task.assignee}</p>
                    <p>Project: {task.project}</p>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <X
              className="absolute top-4 right-4 w-5 h-5 cursor-pointer"
              onClick={() => setShowModal(false)}
            />
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
              <Input
                placeholder="Description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
              <Input
                placeholder="Assignee"
                value={newTask.assignee}
                onChange={(e) =>
                  setNewTask({ ...newTask, assignee: e.target.value })
                }
              />
              <Input
                placeholder="Project"
                value={newTask.project}
                onChange={(e) =>
                  setNewTask({ ...newTask, project: e.target.value })
                }
              />
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
              />
              <div className="flex gap-2">
                <select
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      priority: e.target.value as Task["priority"],
                    })
                  }
                  className="flex-1 border rounded px-2 py-1"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      status: e.target.value as Task["status"],
                    })
                  }
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
    </div>
  );
}
