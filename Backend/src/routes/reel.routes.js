import { Router } from "express";
import { getReel, getReels, likeReel, saveReel } from "../controllers/reels.controller.js";
import { checkAuthMiddleware } from '../middlewares/auth.middleware.js'


const router = Router()


router.get('/reels', checkAuthMiddleware, getReels)

router.get('/:reelId', checkAuthMiddleware, getReel)

router.post('/like', checkAuthMiddleware, likeReel)

router.post('/save', checkAuthMiddleware, saveReel)



export default router