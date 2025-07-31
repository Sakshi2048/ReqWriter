import express from 'express';
import {
  getSpaceByName,
  createSpace,
  createPage
} from '../controllers/confluenceController.js';

const router = express.Router();

router.get('/space/:name', getSpaceByName);
router.post('/create-space', createSpace);
router.post('/create-page', createPage);

export default router;
