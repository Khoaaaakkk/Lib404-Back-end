import mongoose from 'mongoose'

const TableSchema = mongoose.Schema(
  {
    tableID: {
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

    roomID: {
      type: Number,
      required: true,
      ref: 'Room'
    },

    availability: {
      type: Boolean,
      default: true
    },

    date: {
      type: Date,
      default: null
    }
  },

  { timestamps: true }
)

export default mongoose.model('Table', TableSchema)
