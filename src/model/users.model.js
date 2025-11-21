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
    hashedPassword: {
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
    displayName: {
      type: String,
      require: true,
      trim: true
    },
    avatarUrl: {
      type: String // Link CDN for image
    },
    avatarId: {
      type: String // Cloudinary public_id for delete image
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', UserSchema)

export default User
