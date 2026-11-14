import { Router } from 'express';
import { getStatusSummary, getStatusRadar } from '../controllers/statusController.js';

const router = Router();

router.get('/summary', getStatusSummary);
router.get('/radar', getStatusRadar);

export default router;
