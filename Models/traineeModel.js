import mongoose from 'mongoose';

const traineeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  course: { type: String, required: true },
  joinDate: { type: Date, required: true },
  profilePic: { type: String }
}, { timestamps: true });

const Trainee = mongoose.model('Trainee', traineeSchema);

export default Trainee;
