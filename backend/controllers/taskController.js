import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  let tasks;
  if (req.user.role === 'Developer') {
    tasks = await Task.find({ assignedTo: req.user.id }).populate('project', 'name');
  } else {
    tasks = await Task.find().populate('assignedTo', 'username').populate('project', 'name');
  }
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, project, assignedTo, deadline } = req.body;
  const task = await Task.create({ title, project, assignedTo, deadline });
  res.json({ message: `Task "${title}" created`, task });
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { status, comments } = req.body;

  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (req.user.role === 'Developer' && task.assignedTo.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Access denied: cannot edit this task' });
  }

  if (status) task.status = status;
  if (comments) task.comments = comments;

  await task.save();
  res.json({ message: 'Task updated', task });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted' });
};
