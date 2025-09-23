
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: String,
  dob: String,
  gender: String,
  address: String,
  role: String,
  isActive: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
