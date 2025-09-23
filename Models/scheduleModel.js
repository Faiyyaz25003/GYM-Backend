import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  trainer: { type: String, required: true },
  course: { type: String, required: true },
  time: { type: String, required: true },
  days: [{ type: String }],
  room: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Schedule', scheduleSchema);
