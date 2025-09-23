
import Reference from '../models/referenceModel.js';

// Create a new reference
export const createReference = async (req, res) => {
  try {
    const { videoUrl, category, description } = req.body;

    if (!videoUrl || !category || !description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const reference = new Reference({ videoUrl, category, description });
    await reference.save();

    res.status(201).json(reference);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all references
export const getAllReferences = async (req, res) => {
  try {
    const references = await Reference.find().sort({ createdAt: -1 });
    res.status(200).json(references);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete a reference by ID
export const deleteReference = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Reference.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Reference not found.' });
    }

    res.status(200).json({ message: 'Reference deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
