import 'dotenv/config'
import express from "express"
import connectToDB from "./database/db.js";
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import reelRoutes from './routes/reel.routes.js'
import userRoutes from './routes/user.routes.js'
import cors from 'cors'
import creatorRoutes from './routes/creator.routes.js'

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

connectToDB()

// auth routes for user and foodPartner
app.use('/api/user/auth', authRoutes)

//creator routes
app.use('/api/creator', creatorRoutes)

//reel routes
app.use('/api/reel', reelRoutes)

//user routes
app.use('/api/user', userRoutes)


export default app