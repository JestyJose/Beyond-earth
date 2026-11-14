import { Router } from 'express';
import { 
  getAllQuizzes, 
  getQuizBySlug, 
  getAllSimulations, 
  getSimulationBySlug, 
  getDailyChallenge 
} from '../controllers/quizController.js';

const router = Router();

router.get('/', getAllQuizzes);
router.get('/simulations', getAllSimulations);
router.get('/simulations/:slug', getSimulationBySlug);
router.get('/daily', getDailyChallenge);
router.get('/:slug', getQuizBySlug);

export default router;
