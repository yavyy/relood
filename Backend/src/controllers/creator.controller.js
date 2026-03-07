import { Reel } from "../models/reel.model.js";
import { uploadFile } from "../services/fileStorage.service.js";
import { v4 as uuid } from 'uuid'
import { User } from "../models/users.model.js";


async function createReel(req, res) {
  try {
    const { caption } = req.body
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Video is required" })
    }

    const fileUploadResult = await uploadFile(req.file.buffer, uuid())

    if (!fileUploadResult) {
      throw new Error("Something went wrong while upload video")
    }

    const reel = await Reel.create({
      video: fileUploadResult.url,
      caption,
      uploadedBy: req.user._id
    })

    const populatedReel = await reel.populate("uploadedBy", "fullName")

    res.status(201).json({ success: true, message: 'Video uploaded successfully', reel: populatedReel })

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to upload reel", error: error.message })
  }
}

async function creatorProfile(req, res) {
  try {
    const { creatorId } = req.params
    const creator = await User.findById(creatorId).select("-password -role")
    if (!creator) {
      return res.status(404).json({ success: false, message: "Creator not found" })
    }

    const creatorReels = await Reel.find({ uploadedBy: creatorId })

    const creatorData = {
      creator,
      creatorReels
    }

    res.status(200).json({ success: true, message: "Profile fetched successfully", creatorData })

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get creator profile", error: error.message })
  }
}

export {
  createReel,
  creatorProfile,
}