import express from 'express';
import Consultation from '../models/Consultation.js'; // ✅ Make sure this model file uses export default
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
// 🟢 User asks a question (needs to be logged in)
router.post('/ask', protect, async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const newConsultation = new Consultation({
      user: req.user._id, // ✅ from token
      question,
      answer: '',
      createdAt: new Date(),
    });

    await newConsultation.save();
    res.status(201).json(newConsultation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔐 Get consultations for the logged-in user
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const consultations = await Consultation.find({ user: req.user._id });
    res.status(200).json(consultations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Vet fetches all consultations
router.get('/vet/all', async (req, res) => {
  try {
    const allConsultations = await Consultation.find();
    res.status(200).json(allConsultations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Vet replies to a question
router.put('/reply/:id', async (req, res) => {
  const { answer } = req.body;
  try {
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { answer },
      { new: true }
    );

    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    res.json(consultation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;