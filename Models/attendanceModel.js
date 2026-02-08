import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // future me auth add kar sakte ho
      required: true,
    },

    punchIn: {
      photo: String,
      location: String,
      time: Date,
    },

    punchOut: {
      photo: String,
      location: String,
      time: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
