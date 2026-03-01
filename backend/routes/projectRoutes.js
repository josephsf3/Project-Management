import express from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', authenticateJWT, getProjects);
router.get('/dashboard', authenticateJWT, getProjects);
router.post('/', authenticateJWT, authorizeRoles('Admin', 'ProjectManager'), createProject);
router.put('/:id', authenticateJWT, authorizeRoles('Admin', 'ProjectManager'), updateProject);
router.delete('/:id', authenticateJWT, authorizeRoles('Admin', 'ProjectManager'), deleteProject);

export default router;
