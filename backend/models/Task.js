import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  comments: { type: String },
  deadline: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Task', taskSchema);
