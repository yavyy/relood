import { SavedReel } from "../models/savedReels.model.js"

async function getUserSavedReels(req, res) {
  try {
    const user = req.user
    const userSavedReels = await SavedReel.find({
      savedBy: user._id
    }).populate("savedReel")
    res.status(200).json({success: true, message: "User saved reels fetched successfully", userSavedReels})
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch saved reels", error: error.message })
  }
}



export {
  getUserSavedReels
}