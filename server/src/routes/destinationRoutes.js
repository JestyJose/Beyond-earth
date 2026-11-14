import { Router } from 'express';
import { getAllDestinations, getDestinationBySlug } from '../controllers/destinationController.js';

const router = Router();

router.get('/', getAllDestinations);
router.get('/:slug', getDestinationBySlug);

export default router;
