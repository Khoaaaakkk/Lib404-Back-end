import mongoose from 'mongoose'

const LockerSchema = mongoose.Schema({
  lockerId: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },

  user: {
    type: String
  },

  availability: {
    type: Boolean,
    default: false,
    required: true
  }
})

export default mongoose.model('Locker', LockerSchema)
