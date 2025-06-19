import express from 'express';
import Animal from '../models/animalModel.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { name, species, age } = req.body;
    const animal = new Animal({
      name,
      species,
      age,
      user: req.user.id, // ✅ correct field
    });
    await animal.save();
    res.status(201).json(animal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const animals = await Animal.find({ user: req.user.id }); // ✅ secure by user
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const animal = await Animal.findOne({ _id: req.params.id, user: req.user.id }); // ✅ correct
    if (!animal) return res.status(404).json({ error: 'Animal not found or unauthorized' });

    animal.name = req.body.name || animal.name;
    animal.species = req.body.species || animal.species;
    animal.age = req.body.age || animal.age;

    const updatedAnimal = await animal.save();
    res.json(updatedAnimal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const animal = await Animal.findOneAndDelete({ _id: req.params.id, user: req.user.id }); // ✅ correct
    if (!animal) return res.status(404).json({ error: 'Animal not found or unauthorized' });
    res.json({ message: 'Animal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// ✅ DELETE: Delete only if it belongs to user
router.delete('/:id', protect, async (req, res) => {
  try {
    const animal = await Animal.findOneAndDelete({ _id: req.params.id, userId: req.user.id }); // 👈 secure delete
    if (!animal) return res.status(404).json({ error: 'Animal not found or unauthorized' });
    res.json({ message: 'Animal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
