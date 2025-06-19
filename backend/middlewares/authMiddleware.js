import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config(); // ✅ Load env variables

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      const token = authHeader.split(' ')[1]; // Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Verify using secret from .env

      req.user = await User.findById(decoded.id).select('-password'); // Attach user to request
      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      next(); // Proceed
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};


// ✅ Only allow if the logged-in user is a vet
export const isVet = (req, res, next) => {
  if (req.user && req.user.role === 'vet') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Vet only' });
  }
};
