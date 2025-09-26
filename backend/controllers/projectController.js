import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  const projects = await Project.find().populate('team', 'username role');
  res.json(projects);
};

export const createProject = async (req, res) => {
  const { name, team } = req.body;
  const project = await Project.create({ name, team });
  res.json({ message: `Project ${name} created`, project });
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const project = await Project.findByIdAndUpdate(id, updates, { new: true });
  res.json({ message: 'Project updated', project });
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  res.json({ message: 'Project deleted' });
};
