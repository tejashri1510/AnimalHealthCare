// backend/models/animalModel.js
import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // 🔁 Reference to User collection
    required: true,
  }
}, {
  timestamps: true, // ⏱️ Optional: adds createdAt and updatedAt
});

const Animal = mongoose.model('Animal', animalSchema);
export default Animal;
