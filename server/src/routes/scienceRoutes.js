import { Router } from 'express';
import { getAllConcepts, getConceptBySlug, getAllDiscoveries } from '../controllers/scienceController.js';

const router = Router();

router.get('/concepts', getAllConcepts);
router.get('/concepts/:slug', getConceptBySlug);
router.get('/discoveries', getAllDiscoveries);

export default router;
