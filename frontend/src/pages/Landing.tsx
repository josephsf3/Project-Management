import { ArrowRight, CheckCircle, BarChart3, Users, FolderKanban, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: FolderKanban,
    title: "Project Management",
    description: "Organize and track projects with intuitive boards and timelines"
  },
  {
    icon: CheckCircle,
    title: "Task Tracking",
    description: "Streamline workflows with drag-and-drop task management"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time insights and reporting for data-driven decisions"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Seamless communication and role-based access control"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance for smooth user experience"
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with JWT authentication"
  }
];

const stats = [
  { label: "Active Projects", value: "500+" },
  { label: "Happy Teams", value: "50+" },
  { label: "Tasks Completed", value: "10K+" },
  { label: "Uptime", value: "99.9%" }
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-card border-b border-white/10 rounded-none fade-in">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
                <FolderKanban className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">ProjectFlow</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-foreground hover:bg-white/50">
                  Login
                </Button>
              </Link>
              <Link to="/login">
                <Button className="btn-gradient">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Modern Project
              <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                {" "}Management
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Streamline your workflow with our intuitive project management platform. 
              Track tasks, collaborate with teams, and deliver projects on time with beautiful, 
              glassmorphic interface design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/login">
                <Button size="lg" className="btn-gradient text-lg px-8 py-6">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/30 border-white/20 hover:bg-white/40">
                Watch Demo
              </Button>
            </div>

            {/* Hero Visual */}
            <div className="glass-card p-8 max-w-4xl mx-auto scale-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-accent/10 via-transparent to-accent/10 p-6 rounded-xl">
                <div className="text-sm text-muted-foreground mb-2">Live Dashboard Preview</div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-white/40 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-accent" />
                  </div>
                  <div className="h-20 bg-white/40 rounded-lg flex items-center justify-center">
                    <FolderKanban className="w-8 h-8 text-accent" />
                  </div>
                  <div className="h-20 bg-white/40 rounded-lg flex items-center justify-center">
                    <Users className="w-8 h-8 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything you need to manage projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help teams collaborate efficiently and deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="glass-card-interactive p-8 slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 text-center scale-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Ready to transform your workflow?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of teams already using ProjectFlow to deliver better projects faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="btn-gradient text-lg px-8 py-6">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/30 border-white/20 hover:bg-white/40">
                Contact Sales
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
                <FolderKanban className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-foreground">ProjectFlow</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
              <span>© 2024 ProjectFlow. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}