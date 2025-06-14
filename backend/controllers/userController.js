import Animal from '../models/animalModel.js';

export const addAnimal = async (req, res) => {
  try {
    const newAnimal = new Animal(req.body);
    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add animal' });
  }
};

export const getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.status(200).json(animals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch animals' });
  }
};
