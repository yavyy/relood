import { User } from "../models/users.model.js";
import jwt from "jsonwebtoken"

async function registerUser(req, res) {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" })
    }

    const isUserExists = await User.findOne({ email })

    if (isUserExists) {
      return res.status(409).json({ success: false, message: "User already exists" })
    }

    const user = await User.create({
      fullName: fullName.trim(),
      email,
      password,
      role
    })

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' })

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    }

    res.cookie('token', token, options)

    res.status(201).json({
      success: true, message: "User registered successfully", user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    })

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to register user", error: error.message })
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ success: false, message: "Invald user credentials" })
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid user credentials" })
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' })

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
    }

    res.cookie('token', token, options)

    res.status(200).json({
      success: true, message: "User logged in successfully", user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    })

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login user", error: error.message })
  }
}

async function logoutUser(_, res) {
  res.clearCookie("token")
  res.status(200).json({ success: true, message: "User logged out succesfully" })
}

async function getUser(req, res) {
  try {
    const { _id: id } = req.user
    const user = await User.findById(id).select("-password")

    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exists" })
    }

    res.status(200).json({ success: true, user })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch user", error: error.message })
  }
}

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser
}