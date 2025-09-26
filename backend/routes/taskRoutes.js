import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', authenticateJWT, getTasks);
router.post('/', authenticateJWT, authorizeRoles('Admin', 'ProjectManager'), createTask);
router.put('/:id', authenticateJWT, authorizeRoles('Admin', 'ProjectManager', 'Developer'), updateTask);
router.delete('/:id', authenticateJWT, authorizeRoles('Admin', 'ProjectManager'), deleteTask);

export default router;
