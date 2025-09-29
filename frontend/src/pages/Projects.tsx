import axios from "axios";
import { Plus, Search, Calendar, Users, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Project } from "@/types/projects";
import { useState, useEffect } from "react";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'on-hold'>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Form fields
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTeamSize, setNewTeamSize] = useState(1);
  const [newDueDate, setNewDueDate] = useState("");
  const [newProgress, setNewProgress] = useState(0);
  const [newStatus, setNewStatus] = useState<'active' | 'completed' | 'on-hold'>('active');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');

  useEffect(() => {
    async function getProjects() {
      const response = await axios.get<Project[]>('http://localhost:4090/api/projects/all');
      setProjects(response.data);
    }
    getProjects();
  }, []);

  const handleCreateProject = async () => {
    if (!newName) return alert("Project name is required");

    try {
      const response = await axios.post<Project>('http://localhost:4090/api/projects', {
        name: newName,
        description: newDescription,
        teamSize: newTeamSize,
        dueDate: newDueDate,
        progress: newProgress,
        status: newStatus,
        priority: newPriority
      });
      setProjects([response.data, ...projects]);
      setShowModal(false);
      // Reset form
      setNewName(""); setNewDescription(""); setNewTeamSize(1);
      setNewDueDate(""); setNewProgress(0); setNewStatus('active'); setNewPriority('medium');
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Project['status']) => ({
    'active': 'bg-accent/10 text-accent',
    'completed': 'bg-success/10 text-success',
    'on-hold': 'bg-warning/10 text-warning'
  }[status]);

  const getPriorityBadge = (priority: Project['priority']) => ({
    'high': 'bg-destructive/10 text-destructive',
    'medium': 'bg-warning/10 text-warning',
    'low': 'bg-success/10 text-success'
  }[priority]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="glass-card p-6 fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground">Manage and track your project portfolio</p>
          </div>
          <Button className="btn-gradient" onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <X className="absolute top-4 right-4 w-5 h-5 cursor-pointer" onClick={() => setShowModal(false)} />
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            <div className="flex flex-col gap-3">
              <Input placeholder="Project Name" value={newName} onChange={e => setNewName(e.target.value)} />
              <Textarea placeholder="Project Description" value={newDescription} onChange={e => setNewDescription(e.target.value)} />
              <p className="text-muted-foreground" style={{fontSize:"13px"}}>Team:</p>
              <Input type="number" placeholder="Team Size" value={newTeamSize} min={1} onChange={e => setNewTeamSize(Number(e.target.value))} />
              <Input type="date" value={newDueDate} onChange={e => setNewDueDate(e.target.value)} />
              <p className="text-muted-foreground" style={{fontSize:"13px"}} >Progress:</p>
              <Input type="number" placeholder="Progress %" value={newProgress} min={0} max={100} onChange={e => setNewProgress(Number(e.target.value))} />

              <div className="flex gap-2">
                <Select value={newStatus} onValueChange={value => setNewStatus(value as typeof newStatus)}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On-Hold</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={newPriority} onValueChange={value => setNewPriority(value as typeof newPriority)}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Priority" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="btn-gradient mt-3" onClick={handleCreateProject}>Create Project</Button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="glass-card p-6 slide-up">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search projects..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-white/30 border-white/20" />
          </div>

          <div className="flex gap-2">
            {(['all', 'active', 'completed', 'on-hold'] as const).map(status => (
              <Button key={status} variant={filterStatus === status ? 'default' : 'outline'} size="sm" onClick={() => setFilterStatus(status)} className={filterStatus === status ? 'btn-gradient' : 'bg-white/30 border-white/20'}>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div key={project._id} className="glass-card-interactive p-6 slide-up">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              </div>
              <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium text-foreground">{project.progress}%</span>
              </div>
              <div className="progress-glass h-2"><div className="progress-fill" style={{ width: `${project.progress}%` }} /></div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{new Date(project.dueDate).toLocaleDateString()}</div>
                <div className="flex items-center"><Users className="w-4 h-4 mr-1" />{project.teamSize}</div>
              </div>

              <div className="flex gap-2">
                <Badge className={getStatusBadge(project.status)}>{project.status.replace('-', ' ')}</Badge>
                <Badge className={getPriorityBadge(project.priority)}>{project.priority}</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
