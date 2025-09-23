import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    type: { type: String, enum: ['standard', 'premium', 'vip'], required: true },
    features: { type: [String], required: true },
    description: { type: String, required: true }
  });
  
  const Plan = mongoose.model("Plan", planSchema);
  
  export default Plan;
  