import mongoose from 'mongoose';

const symptomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
     },
     user: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: 'User', 
       required: true,
       },
  
});

const Symptom = mongoose.model('Symptom', symptomSchema);
export default Symptom;
