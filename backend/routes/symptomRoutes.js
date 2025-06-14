import express from 'express';
import {
  addSymptom,
  getSymptoms,
  updateSymptom,
  deleteSymptom,
} from '../controllers/symptomController.js';

const router = express.Router();

// POST - Add new symptom
router.post('/', addSymptom);

// GET - Get all symptoms
router.get('/', getSymptoms);

// PUT - Update a symptom by ID
router.put('/:id', updateSymptom);

// DELETE - Delete a symptom by ID
router.delete('/:id', deleteSymptom);

export default router;
