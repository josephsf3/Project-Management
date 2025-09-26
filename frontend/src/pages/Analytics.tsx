import { BarChart3, TrendingUp, Users, Clock, Target, Activity } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const projectData = [
  { month: 'Jan', completed: 8, ongoing: 12 },
  { month: 'Feb', completed: 12, ongoing: 15 },
  { month: 'Mar', completed: 15, ongoing: 18 },
  { month: 'Apr', completed: 18, ongoing: 14 },
  { month: 'May', completed: 22, ongoing: 16 },
  { month: 'Jun', completed: 25, ongoing: 20 }
];

const taskStatusData = [
  { name: 'Completed', value: 156, color: '#10b981' },
  { name: 'In Progress', value: 84, color: '#3b82f6' },
  { name: 'To Do', value: 42, color: '#6b7280' }
];

const teamProductivity = [
  { name: 'John Doe', tasks: 28, hours: 160 },
  { name: 'Sarah Johnson', tasks: 24, hours: 152 },
  { name: 'Mike Chen', tasks: 22, hours: 148 },
  { name: 'Emily Davis', tasks: 26, hours: 156 },
  { name: 'Alex Rodriguez', tasks: 20, hours: 144 }
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">Insights and performance metrics for your projects</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Last updated:</span>
            <span className="text-sm font-medium text-foreground">2 minutes ago</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-up">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Projects</p>
              <p className="text-3xl font-bold text-foreground">24</p>
              <p className="text-sm text-success">+12% from last month</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <p className="text-3xl font-bold text-foreground">87%</p>
              <p className="text-sm text-success">+5% improvement</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-3xl font-bold text-foreground">18</p>
              <p className="text-sm text-accent">All team members</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Response</p>
              <p className="text-3xl font-bold text-foreground">2.4h</p>
              <p className="text-sm text-warning">-15 min improvement</p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Completion Trend */}
        <div className="glass-card p-6 scale-in">
          <h3 className="text-lg font-semibold text-foreground mb-6">Project Completion Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--success))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ongoing" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--accent))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Status Distribution */}
        <div className="glass-card p-6 scale-in">
          <h3 className="text-lg font-semibold text-foreground mb-6">Task Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Team Productivity */}
      <div className="glass-card p-6 slide-up">
        <h3 className="text-lg font-semibold text-foreground mb-6">Team Productivity</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={teamProductivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="tasks" fill="hsl(var(--accent))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}