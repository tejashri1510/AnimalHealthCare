import express from 'express';
const router = express.Router();
import Animal from '../models/animalModel.js';
// POST: Add a new animal
router.post('/', async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.status(201).json(animal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Get all animals
router.get('/:id', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update animal by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedAnimal) return res.status(404).json({ error: 'Animal not found' });
    res.json(updatedAnimal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete animal by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
    if (!deletedAnimal) return res.status(404).json({ error: 'Animal not found' });
    res.json({ message: 'Animal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
