import express from 'express';
import { predictDisease } from '../controllers/mlController.js';
import { protect } from '../middlewares/authMiddleware.js'; // if login required

const router = express.Router();

// POST /api/ml/predict
router.post('/predict', protect, predictDisease); // 🔐 Apply auth if needed

export default router;
