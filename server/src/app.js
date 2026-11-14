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

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allows local dev and deployment preview access
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
