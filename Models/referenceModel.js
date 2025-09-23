// import mongoose from 'mongoose';

// let referenceSchema = new mongoose.Schema({
//   videoUrl: {
//     type: String,
//     required: true
//   }
// });

// export default mongoose.model('Reference', referenceSchema);


import mongoose from 'mongoose';

const referenceSchema = new mongoose.Schema({
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

export default mongoose.model('Reference', referenceSchema);
