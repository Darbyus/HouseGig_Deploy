import express from 'express';
import * as listingController from '../controllers/listingController.js';
import { verifyAuth, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, listingController.getListings);
router.get('/:id', optionalAuth, listingController.getListingById);

// Protected routes
router.post('/', verifyAuth, listingController.createListing);
router.put('/:id', verifyAuth, listingController.updateListing);
router.delete('/:id', verifyAuth, listingController.deleteListing);
router.get('/user/my-listings', verifyAuth, listingController.getUserListings);

export default router;
