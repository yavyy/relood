import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "creator"],
    default: "user"
  }
},
  {
    timestamps: true
  }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return

  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)