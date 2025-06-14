import express from 'express';
import Consultation from '../models/Consultation.js'; // ✅ Make sure this model file uses export default

const router = express.Router();

// POST: Ask a question
router.post('/ask', async (req, res) => {
  try {
    const { userId, question } = req.body;

    if (!userId || !question) {
      return res.status(400).json({ error: 'Missing userId or question' });
    }

    const newConsultation = new Consultation({
      userId,
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

// GET: Get consultation replies by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const consultations = await Consultation.find({ userId: req.params.userId });
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
