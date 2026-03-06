import jwt from 'jsonwebtoken'
import { User } from '../models/users.model.js';

export async function checkAuthMiddleware(req, res, next) {
  console.log("Cookies",req.cookies)
  console.log("header cookie",req.headers.cookie)
  try {
    const token = req.cookies.token || req.headers.cookie;
    if (!token) {
      return res.status(400).json({ success: false, message: "Please login" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(400).json({ success: false, message: "Invalid token" })
    }

    const user = await User.findById(decoded._id)
    req.user = user

    next()
  } catch (error) {
    return res.status(400).json({ success: false, message: "Something went wrong", error: error.message })
  }
}