export const getConsultations = async (req, res) => {
  try {
    // Fetch data from DB or return dummy data
    const data = await Consultation.find(); // or a dummy array
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
