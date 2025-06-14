import Consultation from '../models/consultationModel.js';

// POST: User submits a question
export const askQuestion = async (req, res) => {
  const { question, userName } = req.body;

  try {
    const newConsultation = new Consultation({ question, userName });
    await newConsultation.save();
    res.status(201).json(newConsultation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit question' });
  }
};

// GET: All consultations (for vet to view and reply)
export const getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch consultations' });
  }
};

// PUT: Vet replies to a question
export const replyToQuestion = async (req, res) => {
  const { id } = req.params;
  const { answer, vetName } = req.body;

  try {
    const updated = await Consultation.findByIdAndUpdate(
      id,
      { answer, vetName },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to reply to question' });
  }
};
