const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const vetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// Hash password before saving
vetSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
vetSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Vet', vetSchema);
