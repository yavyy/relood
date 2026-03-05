import { Router } from "express";
import { getUser, loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js'
import { checkAuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', checkAuthMiddleware, getUser)
router.post('/logout', logoutUser)


export default router