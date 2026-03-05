import mongoose from "mongoose";

const reelSchema = new mongoose.Schema({
  video: {
    type: String,
    required: true
  },
  caption: {
    type: String
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
},
  { timestamps: true }
)

export const Reel = mongoose.model("Reel", reelSchema)