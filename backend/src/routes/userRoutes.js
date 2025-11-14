import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authenticate, userController.getMe);
router.get('/:username', userController.getUserProfile);
router.put('/profile', authenticate, userController.updateProfile);

export default router;
