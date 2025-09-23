import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['success', 'error', 'warning', 'info'], default: 'info' },
  time: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  forAdmin: { type: Boolean, default: true }, // allows admin-only filtering
});

export default mongoose.model('Notification', notificationSchema);
