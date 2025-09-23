import mongoose from 'mongoose';

const excersizeReferenceSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('ExcersizeReference', excersizeReferenceSchema);
