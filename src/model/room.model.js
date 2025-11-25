import mongoose from 'mongoose'

const RoomSchema = mongoose.Schema({
  roomId: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },

  type: {
    type: String,
    enum: ['silent', 'standard'],
    required: true
  },

  floorId: {
    type: String,
    ref: 'Floor',
    required: true
  }
})

export default mongoose.model('Room', RoomSchema)
