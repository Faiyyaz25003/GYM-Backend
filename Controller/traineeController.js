
import Trainee from '../Models/traineeModel.js'

// GET all trainees
export const getTrainees = async (req, res) => {
  try {
    const trainees = await Trainee.find().sort({ createdAt: -1 });
    res.json(trainees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single trainee
export const getTrainee = async (req, res) => {
  try {
    const trainee = await Trainee.findById(req.params.id);
    if (!trainee) return res.status(404).json({ message: "Trainee not found" });
    res.json(trainee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a trainee
export const createTrainee = async (req, res) => {
  try {
    const trainee = new Trainee(req.body);
    const savedTrainee = await trainee.save();
    res.status(201).json(savedTrainee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE a trainee
export const updateTrainee = async (req, res) => {
  try {
    const updatedTrainee = await Trainee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTrainee) return res.status(404).json({ message: "Trainee not found" });
    res.json(updatedTrainee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a trainee
export const deleteTrainee = async (req, res) => {
  try {
    const deletedTrainee = await Trainee.findByIdAndDelete(req.params.id);
    if (!deletedTrainee) return res.status(404).json({ message: "Trainee not found" });
    res.json({ message: "Trainee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET total count of trainees
export const getTraineeCount = async (req, res) => {
  try {
    const count = await Trainee.countDocuments(); // You can add a filter like { active: true } if needed
    res.status(200).json({ count });
  } catch (err) {
    console.error('Failed to get trainee count:', err.message);
    res.status(500).json({ message: 'Server error while fetching trainee count' });
  }
};
