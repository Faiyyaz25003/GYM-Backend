import Attendance from "../Models/attendanceModel.js";

/**
 * 🔹 Punch In
 */
export const punchIn = async (req, res) => {
  try {
    const { userId, photo, location } = req.body;

    // check already punched in today
    const today = new Date().setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      userId,
      createdAt: { $gte: today },
      "punchIn.time": { $exists: true },
    });

    if (existing) {
      return res.status(400).json({ message: "Already punched in today" });
    }

    const attendance = await Attendance.create({
      userId,
      punchIn: {
        photo,
        location,
        time: new Date(),
      },
    });

    res.status(201).json({
      message: "Punch In Successful",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 🔹 Punch Out
 */
export const punchOut = async (req, res) => {
  try {
    const { userId, photo, location } = req.body;

    const attendance = await Attendance.findOne({
      userId,
      punchOut: { $exists: false },
    }).sort({ createdAt: -1 });

    if (!attendance) {
      return res.status(404).json({ message: "Punch in not found" });
    }

    // 1 hour rule
    const diff = Date.now() - new Date(attendance.punchIn.time).getTime();
    if (diff < 60 * 60 * 1000) {
      return res
        .status(400)
        .json({ message: "Punch out allowed after 1 hour" });
    }

    attendance.punchOut = {
      photo,
      location,
      time: new Date(),
    };

    await attendance.save();

    res.json({
      message: "Punch Out Successful",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 🔹 Get All Attendance (Admin / User)
 */
export const getAttendance = async (req, res) => {
  try {
    const { userId } = req.query;

    const data = await Attendance.find(userId ? { userId } : {}).sort({
      createdAt: -1,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 🔹 Get Today Status
 */
export const getTodayStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const today = new Date().setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      userId,
      createdAt: { $gte: today },
    });

    res.json(attendance || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
