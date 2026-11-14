import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import destinationRoutes from './routes/destinationRoutes.js';
import hardwareRoutes from './routes/hardwareRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js';
import scienceRoutes from './routes/scienceRoutes.js';
import statusRoutes from './routes/statusRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { config } from './config/env.js';

const app = express();

// Allowed origins
const explicitOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'https://beyond-earth-ten.vercel.app',
  'https://beyond-earth.vercel.app'
];

if (config.clientUrl) {
  // Support comma-separated URLs and strip trailing slashes
  config.clientUrl.split(',').forEach(url => {
    const trimmed = url.trim().replace(/\/$/, '');
    if (trimmed && !explicitOrigins.includes(trimmed)) {
      explicitOrigins.push(trimmed);
    }
  });
}

// CORS Middleware with development flexibility and production hardening
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server) or in development
    if (!origin || config.nodeEnv === 'development' || explicitOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Allow all Vercel deployment origins (*.vercel.app)
    if (/^https:\/\/[a-zA-Z0-9_-]+\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Beyond Earth NASA Space Apps API',
    version: '1.0.0'
  });
});

// Mount modular API routes
app.use('/api/v1/destinations', destinationRoutes);
app.use('/api/v1/hardware', hardwareRoutes);
app.use('/api/v1/timeline', timelineRoutes);
app.use('/api/v1/science', scienceRoutes);
app.use('/api/v1/status', statusRoutes);
app.use('/api/v1/academy/quizzes', quizRoutes);

// Catch 404 and forward to error handler
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
