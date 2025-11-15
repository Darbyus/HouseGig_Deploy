import express from 'express';
import * as collectionController from '../controllers/collectionController.js';
import { verifyAuth } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.post('/', verifyAuth, collectionController.createCollection);
router.get('/user/my-collections', verifyAuth, collectionController.getUserCollections);
router.get('/:id', verifyAuth, collectionController.getCollectionById);
router.delete('/:id', verifyAuth, collectionController.deleteCollection);

// Collection-Listing operations
router.post('/listing/add', verifyAuth, collectionController.addListingToCollection);
router.post('/listing/remove', verifyAuth, collectionController.removeListingFromCollection);

export default router;
