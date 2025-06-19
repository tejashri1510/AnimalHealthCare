import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ✅ Get logged-in user's profile
router.get('/profile', protect, getProfile);

// ✅ Update logged-in user's profile
router.put('/profile', protect, updateProfile);

export default router;
