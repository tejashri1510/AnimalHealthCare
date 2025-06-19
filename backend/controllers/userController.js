import User from '../models/User.js';

// ✅ GET: Current logged-in user's profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user profile' });
  }
};

// ✅ PUT: Update user or vet profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const updates = {};
    const fields = [
      'name', 'email', 'password', 'specialization',
      'phone', 'experience', 'clinic', 'location', 'avatar'
    ];

    // Only update fields that are provided in the request
    for (const field of fields) {
      if (req.body[field]) {
        updates[field] = req.body[field];
      }
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Apply updates
    Object.assign(user, updates);

    await user.save(); // Password will be hashed automatically if modified

    // ✅ Exclude password from response
    const { password, ...updatedUser } = user.toObject();

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
