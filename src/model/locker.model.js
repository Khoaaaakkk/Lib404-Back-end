import mongoose from 'mongoose'

const LockerSchema = mongoose.Schema({
  lockerId: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },

  availability: {
    type: Boolean,
    default: false,
    required: true
  },

  username: {
    type: String
  }
})
export default mongoose.model('Locker', LockerSchema)
