import { Like } from "../models/likes.model.js"
import { Reel } from "../models/reel.model.js"
import { SavedReel } from "../models/savedReels.model.js"

async function getReels(req, res) {
  try {
    const reels = await Reel.find({}).populate("uploadedBy", "fullName")

    const likes = await Like.find({
      likedBy: req.user._id
    })

    const likedReelsId = new Set(
      likes.map((like) => like.likedOn.toString())
    )

    const savedReels = await SavedReel.find({
      savedBy: req.user._id
    })

    const savedReelsId = new Set(
      savedReels.map((savedReel) => savedReel.savedReel.toString())
    )

    const reelsWithLikedAndSavedState = reels.map(reel => (
      {
        ...reel.toObject(),
        isLiked: likedReelsId.has(reel._id.toString()),
        saved: savedReelsId.has(reel._id.toString())
      }
    ))

    res.status(200).json({ success: true, message: "Reels fetched successfully", reels: reelsWithLikedAndSavedState })

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error while fetching reels", error: error.message })
  }
}

async function likeReel(req, res) {
  try {
    const { reelId } = req.body
    const user = req.user
    const isReelLiked = await Like.findOne({
      likedBy: user._id,
      likedOn: reelId
    })

    if (isReelLiked) {
      await Like.deleteOne({
        likedBy: user._id,
        likedOn: reelId
      })

      await Reel.findByIdAndUpdate(reelId, {
        $inc: { likes: -1 }
      })

      return res.status(200).json({ success: true, message: "Reel unliked successfully", like: false })
    }

    const like = await Like.create({
      likedBy: user._id,
      likedOn: reelId
    })

    await Reel.findByIdAndUpdate(reelId, {
      $inc: { likes: 1 }
    })

    res.status(200).json({ success: true, message: "Reel liked successfully", like: true })

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to like reel", error: error.message })
  }
}

async function getReel(req, res) {
  try {
    const { reelId } = req.params;
    console.log(reelId)
    if (!reelId) {
      return res.status(400).json({ success: false, message: "Invalid ID" })
    }

    const reel = await Reel.findById(reelId).select("video -_id")
    console.log(reel)
    if (!reel) {
      return res.status(400).json({ success: false, message: "No reel found" })
    }

    res.status(200).json({ success: true, message: "Reel fetched successfully", reel })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load reel", error: error.message })
  }
}

async function saveReel(req, res) {
  try {
    const { reelId } = req.body
    if (!reelId) {
      return res.status(400).json({ success: false, message: "Invalid ID" })
    }
    const user = req.user
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exists" })
    }

    const isReelSaved = await SavedReel.findOne({
      savedBy: user._id,
      savedReel: reelId
    })

    if (isReelSaved) {
      await SavedReel.deleteOne({
        savedBy: user._id,
        savedReel: reelId
      })

      return res.status(200).json({ success: true, message: "Reel unsaved successfully", saved: false })
    }

    await SavedReel.create({
      savedBy: user._id,
      savedReel: reelId
    })

    res.status(200).json({ success: true, message: "Reel saved successfully", saved: true })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to save reel", error: error.message })
  }
}


export {
  getReels,
  likeReel,
  getReel,
  saveReel
}