import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const quizPath = path.join(__dirname, '../../data/quiz_seeds.json');

const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

export const getAllQuizzes = (req, res, next) => {
  try {
    const quizzes = readJSON(quizPath);
    const summary = quizzes.map(q => ({
      slug: q.slug,
      title: q.title,
      difficulty: q.difficulty,
      description: q.description,
      badge_points: q.badge_points,
      badge_name: q.badge_name,
      question_count: q.questions.length
    }));

    res.json({
      success: true,
      data: summary,
      meta: { total: summary.length }
    });
  } catch (error) {
    next(error);
  }
};

export const getQuizBySlug = (req, res, next) => {
  try {
    const { slug } = req.params;
    const quizzes = readJSON(quizPath);
    const quiz = quizzes.find(q => q.slug.toLowerCase() === slug.toLowerCase());

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: `Quiz '${slug}' not found`
      });
    }

    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};
