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