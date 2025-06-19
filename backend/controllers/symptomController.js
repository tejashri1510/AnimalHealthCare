import Symptom from '../models/Symptom.js';

// ✅ Add Symptom (attached to logged-in user)
export const addSymptom = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newSymptom = new Symptom({
      name,
      description,
      user: req.user._id, // 🔐 Attach user ID from token
    });

    await newSymptom.save();
    res.status(201).json(newSymptom);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
export const getSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find({ user: req.user._id }); // ✅ Only current user's symptoms
    res.status(200).json(symptoms);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


// ✅ Update symptom only if it belongs to user
export const updateSymptom = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const symptom = await Symptom.findOne({ _id: id, user: req.user._id }); // 🔐 Find by ID and user
    if (!symptom) {
      return res.status(404).json({ error: 'Symptom not found or unauthorized' });
    }

    symptom.name = name;
    symptom.description = description;
    await symptom.save();

    res.status(200).json(symptom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete symptom only if it belongs to user
export const deleteSymptom = async (req, res) => {
  try {
    const deleted = await Symptom.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, // 🔐 Match by user
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Symptom not found or unauthorized' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
