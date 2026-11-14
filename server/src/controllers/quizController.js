import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const quizPath = path.join(__dirname, '../../data/quiz_seeds.json');
const simulationPath = path.join(__dirname, '../../data/simulation_seeds.json');

const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

export const getAllQuizzes = (req, res, next) => {
  try {
    const { difficulty } = req.query;
    let quizzes = readJSON(quizPath);

    if (difficulty) {
      quizzes = quizzes.filter(q => q.difficulty.toUpperCase() === difficulty.toUpperCase());
    }

    const summary = quizzes.map(q => ({
      slug: q.slug,
      title: q.title,
      difficulty: q.difficulty,
      category: q.category,
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

export const getAllSimulations = (req, res, next) => {
  try {
    const simulations = readJSON(simulationPath);
    res.json({
      success: true,
      data: simulations,
      meta: { total: simulations.length }
    });
  } catch (error) {
    next(error);
  }
};

export const getSimulationBySlug = (req, res, next) => {
  try {
    const { slug } = req.params;
    const simulations = readJSON(simulationPath);
    const sim = simulations.find(s => s.slug.toLowerCase() === slug.toLowerCase());

    if (!sim) {
      return res.status(404).json({
        success: false,
        message: `Simulation '${slug}' not found`
      });
    }

    res.json({
      success: true,
      data: sim
    });
  } catch (error) {
    next(error);
  }
};

export const getDailyChallenge = (req, res, next) => {
  try {
    const quizzes = readJSON(quizPath);
    // Flatten all questions
    const allQuestions = [];
    quizzes.forEach(q => {
      q.questions.forEach(quest => {
        allQuestions.push({
          ...quest,
          quiz_title: q.title,
          quiz_slug: q.slug,
          difficulty: q.difficulty
        });
      });
    });

    // Deterministic daily index based on year, month, and day
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const dailyIndex = dayOfYear % allQuestions.length;
    const question = allQuestions[dailyIndex];

    res.json({
      success: true,
      data: {
        date: now.toISOString().slice(0, 10),
        challenge_id: `daily-${now.toISOString().slice(0, 10)}`,
        badge_points: 50,
        question: question
      }
    });
  } catch (error) {
    next(error);
  }
};
