import express from 'express';
import * as likeController from '../controllers/likeController.js';
import { verifyAuth, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.post('/', verifyAuth, likeController.likeListing);
router.delete('/', verifyAuth, likeController.unlikeListing);

// Public routes
router.get('/:listingId/count', optionalAuth, likeController.getListingLikesCount);
router.get('/:listingId/check', verifyAuth, likeController.checkIfLiked);

export default router;
