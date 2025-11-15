import express from 'express';
import * as likeController from '../controllers/likeController.js';
import { authenticate, optional } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, likeController.likeListing);
router.delete('/', authenticate, likeController.unlikeListing);
router.get('/:listingId/count', optional, likeController.getListingLikesCount);
router.get('/:listingId/check', authenticate, likeController.checkIfLiked);
router.get('/my-likes', authenticate, likeController.getUserLikedListings);

export default router;
