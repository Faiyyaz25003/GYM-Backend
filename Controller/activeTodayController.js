import ActiveToday from '../Models/activeTodayModel.js'

export const getActiveToday = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    let record = await ActiveToday.findOne({ date: today });
    if (!record) {
      record = await ActiveToday.create({ date: today, count: 0 });
    }

    res.json({ count: record.count });
  } catch (error) {
    console.error("Error in getActiveToday:", error);
    res.status(500).json({ message: "Server error while fetching active today count." });
  }
};

