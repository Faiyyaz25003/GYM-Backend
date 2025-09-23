
import mongoose from 'mongoose';

const dietSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model('Diet', dietSchema);
