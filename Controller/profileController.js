

import Profile from "../Models/profileModel.js";

// ✅ Create Profile (Only one per user)
export const createProfile = async (req, res) => {
  try {
    const existing = await Profile.findOne({ userId: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "Profile already exists." });
    }

    const profile = new Profile({
      ...req.body,
      userId: req.user.id,
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed to create profile" });
  }
};

// ✅ Get My Profile (Admin or User)
export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error fetching profile" });
  }
};

// ✅ Get All Profiles (Admin dashboard only)
export const getAllProfiles = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error fetching profiles" });
  }
};

// ✅ Update Profile (Admin can update any, User only their own)
export const updateProfile = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    if (req.user.role !== "admin") {
      query.userId = req.user.id;
    }

    const profile = await Profile.findOneAndUpdate(query, req.body, { new: true });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found or unauthorized" });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message || "Error updating profile" });
  }
};

// ✅ Delete Profile (Admin can delete any, User only their own)
export const deleteProfile = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    if (req.user.role !== "admin") {
      query.userId = req.user.id;
    }

    const profile = await Profile.findOneAndDelete(query);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found or unauthorized" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Error deleting profile" });
  }
};
