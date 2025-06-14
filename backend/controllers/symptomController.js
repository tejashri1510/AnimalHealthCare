import Symptom from '../models/Symptom.js';

export const addSymptom = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newSymptom = new Symptom({ name, description });
    await newSymptom.save();
    res.status(201).json(newSymptom);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find();
    res.status(200).json(symptoms);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
export const updateSymptom = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updated = await Symptom.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Symptom not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete symptom by ID
export const deleteSymptom = async (req, res) => {
  try {
    const deleted = await Symptom.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Symptom not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};