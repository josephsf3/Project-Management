import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

export const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed, role });
  res.json({ message: 'User created', user });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (updates.password) updates.password = await bcrypt.hash(updates.password, 10);
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  res.json({ message: 'User updated', user });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'User deleted' });
};
