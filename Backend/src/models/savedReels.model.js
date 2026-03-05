import mongoose from 'mongoose'

const savedReelSchema = new mongoose.Schema({
  savedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  savedReel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reel'
  }
}, {timestamps: true})

export const SavedReel = mongoose.model("SavedReel", savedReelSchema)