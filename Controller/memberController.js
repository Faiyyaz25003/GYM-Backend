
import Member from "../Models/memberModel.js";

// ✅ Create a new member
export const createMember = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      plan,          
      joinDate,
      endDate,
      profilePic,
    } = req.body;

    const newMember = new Member({
      name,
      email,
      phone,
      address,
      plan,
      joinDate,
      endDate,
      profilePic,
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    console.error("Create Member Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get all members
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (err) {
    console.error("Get Members Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get members added in the last 3 days
export const getRecentMembers = async (req, res) => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const recentMembers = await Member.find({
      createdAt: { $gte: threeDaysAgo },
    }).sort({ createdAt: -1 });

    res.status(200).json(recentMembers);
  } catch (err) {
    console.error("Get Recent Members Error:", err.message);
    res.status(500).json({ error: "Failed to fetch recent members" });
  }
};

// ✅ Update a member
export const updateMember = async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.status(200).json(updatedMember);
  } catch (err) {
    console.error("Update Member Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// ✅ Delete a member
export const deleteMember = async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (err) {
    console.error("Delete Member Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
