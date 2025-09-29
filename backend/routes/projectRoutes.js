import express from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', authenticateJWT, (req, res, next) => next());
router.get('/all', getProjects);
router.post('/', authenticateJWT, authorizeRoles('Admin', 'ProjectManager'), createProject);
router.put('/:id', authenticateJWT, authorizeRoles('Admin', 'ProjectManager'), updateProject);
router.delete('/:id', authenticateJWT, authorizeRoles('Admin', 'ProjectManager'), deleteProject);
// router.get('/all', authenticateJWT, getProjects);

export default router;
