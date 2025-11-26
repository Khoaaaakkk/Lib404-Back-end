import mongoose from 'mongoose'

const RoomSchema = mongoose.Schema({
  roomId: {
    type: Number,
    required: true,
    unique: true,
  },

  type: {
    type: String,
    enum: ['silent', 'standard'],
    required: true
  },

  floorId: {
    type: String,
    required: true
  }
})

export default mongoose.model('Room', RoomSchema)
