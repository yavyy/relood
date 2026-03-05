import mongoose from 'mongoose'

const likeSchema = new mongoose.Schema({
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likedOn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reel"
  }
}, { timestamps: true })

export const Like = mongoose.model("Like", likeSchema)