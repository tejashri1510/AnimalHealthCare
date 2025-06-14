// backend/models/animalModel.js
import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
  name: String,
  species: String,
  age: Number
});

const Animal = mongoose.model('Animal', animalSchema);
export default Animal; 
