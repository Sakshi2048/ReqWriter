import express from 'express';
import { handleCreateProject } from '../controllers/jiraController.js';

const router = express.Router();

router.post('/create-project', handleCreateProject);

export default router;
