import express from 'express';
import * as listingController from '../controllers/listingController.js';
import { verifyToken, optional } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', optional, listingController.getAllListings);
router.get('/:id', optional, listingController.getListing);

// Protected routes
router.post('/', verifyToken, listingController.createListing);
router.post('/upload-image', verifyToken, listingController.uploadImage);
router.put('/:id', verifyToken, listingController.updateListing);
router.delete('/:id', verifyToken, listingController.deleteListing);
router.get('/user/my-listings', verifyToken, listingController.getUserListings);

export default router;
