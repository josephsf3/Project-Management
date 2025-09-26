import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
}

export default function StatsCard({ title, value, change, changeType, icon: Icon }: StatsCardProps) {
  const changeColorClass = {
    positive: 'text-success',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground'
  }[changeType];

  return (
    <div className="glass-card p-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          <p className={`text-sm mt-1 ${changeColorClass}`}>
            {change}
          </p>
        </div>
        <div className="w-12 h-12 bg-accent/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-accent" />
        </div>
      </div>
    </div>
  );
}