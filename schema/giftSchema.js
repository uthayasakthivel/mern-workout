import mongoose from "mongoose";
const giftSchema = new mongoose.Schema({
  reps: {
    required: true,
    type: Number,
  },
  rounds: {
    required: true,
    type: Number,
  },
});

export { giftSchema };
