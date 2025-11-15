import express from 'express';
import * as collectionController from '../controllers/collectionController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, collectionController.createCollection);
router.get('/', authenticate, collectionController.getUserCollections);
router.get('/:id', collectionController.getCollection);
router.put('/:id', authenticate, collectionController.updateCollection);
router.delete('/:id', authenticate, collectionController.deleteCollection);
router.post('/:collectionId/listings', authenticate, collectionController.addListingToCollection);
router.delete('/:collectionId/listings', authenticate, collectionController.removeListingFromCollection);

export default router;
