import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import listingsRouter from './routes/listings.js';
import collectionsRouter from './routes/collections.js';
import likesRouter from './routes/likes.js';
import commentsRouter from './routes/comments.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/listings', listingsRouter);
app.use('/api/collections', collectionsRouter);
app.use('/api/likes', likesRouter);
app.use('/api/comments', commentsRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🏰 HouseGig Backend running on port ${PORT}`);
});
