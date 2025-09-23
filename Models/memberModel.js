
import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  plan: { type: String, required: true },
  goal: { type: String, required: true }, // <-- NEW FIELD ADDED
  joinDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  profilePic: { type: String }
}, {
  timestamps: true,
});

const Member = mongoose.model('Member', memberSchema);
export default Member;
