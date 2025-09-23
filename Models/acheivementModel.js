import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String }, // or Date if you're storing date objects
  category: { type: String },
  level: { type: String },
  winner: { type: String },
  year: { type: String }, // use Number if you want strict year format
  imageUrl: { type: String }
}, { timestamps: true });

export default mongoose.model("Achievement", achievementSchema);
