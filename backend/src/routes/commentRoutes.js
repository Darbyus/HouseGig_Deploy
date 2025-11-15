import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { authenticate, optional } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:listingId', authenticate, commentController.createComment);
router.get('/:listingId', optional, commentController.getListingComments);
router.delete('/:commentId', authenticate, commentController.deleteComment);
router.put('/:commentId', authenticate, commentController.updateComment);

export default router;
