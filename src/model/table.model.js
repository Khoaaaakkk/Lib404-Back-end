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
    },

    availability: {
      type: Boolean,
      default: true
    }
  },

  { timestamps: true }
)

export default mongoose.model('Table', TableSchema)
