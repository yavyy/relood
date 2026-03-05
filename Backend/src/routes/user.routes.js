import { Router } from "express";
import { getUserSavedReels } from "../controllers/user.controller.js";
import { checkAuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/saved', checkAuthMiddleware, getUserSavedReels)

export default router