import mongoose from 'mongoose';
const consultationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Required for .populate to work
    required: true,
  },
  question: {
     type: String,
      required: true,
     },

  answer: { 
    type: String,
     default: '' ,
    },
  

  createdAt: { 
    type: Date, 
    default: Date.now,
   },
});

export default mongoose.model('Consultation', consultationSchema);
