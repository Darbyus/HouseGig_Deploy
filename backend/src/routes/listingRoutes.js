import express from 'express';
import * as listingController from '../controllers/listingController.js';
import { authenticate, optional } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, listingController.createListing);
router.get('/', optional, listingController.getAllListings);
router.get('/my-listings', authenticate, listingController.getUserListings);
router.get('/:id', optional, listingController.getListing);
router.put('/:id', authenticate, listingController.updateListing);
router.delete('/:id', authenticate, listingController.deleteListing);

export default router;
