import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Consultation = mongoose.model('Consultation', consultationSchema);

// ✅ Use default export for ESM compatibility
export default Consultation;
