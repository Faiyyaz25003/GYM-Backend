
import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ Add this line
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  alternatePhone: String,
  dob: Date,
  gender: String,
  role: String,
  occupation: String,
  maritalStatus: String,
  bloodGroup: String,
  nationality: String,
  emergencyContactName: String,
  emergencyContactNumber: String,
  address: String,
  country: String,
  state: String,
  city: String,
  profilePic: String,
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
