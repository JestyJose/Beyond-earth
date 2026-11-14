import { Router } from 'express';
import { getAllQuizzes, getQuizBySlug } from '../controllers/quizController.js';

const router = Router();

router.get('/', getAllQuizzes);
router.get('/:slug', getQuizBySlug);

export default router;
