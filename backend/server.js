// server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import vetRoutes from './routes/vetRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import symptomRoutes from './routes/symptomRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/vet', vetRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/auth', authRoutes);


// MongoDB Connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI) // ✅ No need for deprecated options
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
