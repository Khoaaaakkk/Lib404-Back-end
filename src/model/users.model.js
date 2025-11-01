import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    refreshToken: String // Store refresh token with user
  },
  { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

export default User
// module.exports = User
