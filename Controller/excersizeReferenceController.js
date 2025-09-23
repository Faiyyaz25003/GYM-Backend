import ExcersizeReference from '../Models/excersizeReferenceModel.js';

export const createExcersizeReference = async (req, res) => {
  try {
    const { videoUrl, category, description } = req.body;

    if (!videoUrl || !category || !description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const excersizeReference = new ExcersizeReference({ videoUrl, category, description });
    await excersizeReference.save();

    res.status(201).json(excersizeReference);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllExcersizeReferences = async (req, res) => {
  try {
    const excersizeReferences = await ExcersizeReference.find().sort({ createdAt: -1 });
    res.status(200).json(excersizeReferences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteExcersizeReference = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ExcersizeReference.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Reference not found.' });
    }
    res.status(200).json({ message: 'Reference deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
