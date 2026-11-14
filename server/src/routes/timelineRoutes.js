import { Router } from 'express';
import { getTimelineMilestones } from '../controllers/timelineController.js';

const router = Router();

router.get('/', getTimelineMilestones);

export default router;
