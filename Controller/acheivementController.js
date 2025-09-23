
import Achievement from '../Models/acheivementModel.js';
import fs from 'fs';

// ✅ Create Achievement
export const createAchievement = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      category,
      level,
      winner,
      year
    } = req.body;

    const imageUrl = req.file ? `/uploads/achievements/${req.file.filename}` : "";

    const achievement = new Achievement({
      title,
      description,
      date,
      category,
      level,
      winner,
      year,
      imageUrl
    });

    await achievement.save();
    res.status(201).json(achievement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Achievements
export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Single Achievement by ID
export const getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found." });
    }
    res.json(achievement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Achievement by ID
export const updateAchievement = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      category,
      level,
      winner,
      year
    } = req.body;

    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found." });
    }

    // Remove old image if a new one is uploaded
    if (req.file && achievement.imageUrl) {
      const oldImagePath = `.${achievement.imageUrl}`;
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }

    const updatedData = {
      title,
      description,
      date,
      category,
      level,
      winner,
      year,
      imageUrl: req.file ? `/uploads/achievements/${req.file.filename}` : achievement.imageUrl
    };

    const updated = await Achievement.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Achievement by ID
export const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found." });
    }

    // Delete associated image
    if (achievement.imageUrl) {
      const imagePath = `.${achievement.imageUrl}`;
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Achievement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Achievement deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
