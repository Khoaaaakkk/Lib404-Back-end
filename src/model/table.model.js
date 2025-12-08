import mongoose from 'mongoose'

const TableSchema = mongoose.Schema(
  {
    tableId: {
      type: Number,
      required: true,
      unique: true,
      trim: true
    },

    type: {
      type: String,
      enum: ['single', 'group'],
      required: true
    },

    roomId: {
      type: Number,
      required: true,
      ref: 'Room'
    },

    availability: {
      type: Boolean,
      default: true
    },

    username: {
      type: String
    },

    expiresAt: {
      type: Date,
      default: null
    },

    reservedTime: {
      type: Number
    }
  },

  { timestamps: true }
)

export default mongoose.model('Table', TableSchema)
