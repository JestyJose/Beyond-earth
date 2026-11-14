import { Router } from 'express';
import { getAllHardware, getHardwareBySlug, getFeaturedHardware } from '../controllers/hardwareController.js';

const router = Router();

router.get('/', getAllHardware);
router.get('/featured', getFeaturedHardware);
router.get('/:slug', getHardwareBySlug);

export default router;
