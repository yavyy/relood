import { Router } from "express";
import { checkAndAuthorizeRole } from '../middlewares/checkRole.middleware.js'
import { checkAuthMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../utils/multer.util.js";
import { creatorProfile, createReel } from "../controllers/creator.controller.js";

const router = Router()

router.post('/create', checkAuthMiddleware, checkAndAuthorizeRole("creator"), upload.single("video"), createReel)

router.get('/:creatorId', checkAuthMiddleware, creatorProfile)

export default router