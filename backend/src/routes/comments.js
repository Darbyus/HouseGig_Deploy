import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { verifyAuth, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.post('/', verifyAuth, commentController.createComment);
router.delete('/:id', verifyAuth, commentController.deleteComment);

// Public routes
router.get('/:listingId', optionalAuth, commentController.getListingComments);

export default router;
