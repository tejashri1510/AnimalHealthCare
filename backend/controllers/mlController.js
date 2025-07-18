import axios from 'axios';

export const predictDisease = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: 'Symptoms array is required' });
    }

    // 🧠 Send data to Flask ML server
   // ✅ USE 127.0.0.1 INSTEAD OF localhost
const response = await axios.post('http://127.0.0.1:5001/predict', {
  symptoms,
});


    const { disease, precautions } = response.data;

    return res.status(200).json({
      disease,
      precautions,
    });
  } catch (error) {
    console.error('ML Prediction Error:', error.message);
    return res.status(500).json({ error: 'ML Prediction failed' });
  }
};
