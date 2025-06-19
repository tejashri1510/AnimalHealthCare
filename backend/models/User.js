import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
 name: { type: String, required: true },
email: { type: String, unique: true, required: true },
password: { type: String, required: true },

  role: { type: String, enum: ['user', 'vet'], default: 'user' },
  // Optional vet-specific fields
  specialization: { type: String },
  phone: { type: String },
  experience: { type: String },
  clinic: { type: String },
  location: { type: String },
  avatar: { type: String, default: '' }
}, {
  timestamps: true

});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// ✅ Export as default
export default User;
