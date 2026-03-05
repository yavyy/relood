import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log("Database connected")
  } catch (error) {
    console.error("Database connection failed", error)
    process.exit(1)
  }
}



export default connectToDB