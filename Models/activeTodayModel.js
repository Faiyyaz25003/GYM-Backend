import mongoose from 'mongoose';

const activeTodaySchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
});

export default mongoose.model('ActiveToday', activeTodaySchema);
