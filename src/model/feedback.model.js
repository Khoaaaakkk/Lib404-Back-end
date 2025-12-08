import mongoose from 'mongoose'

const FeedbackSchema = mongoose.Schema(
  {
    username: {
      type: String
    },

    email: {
      type: String
    },

    feedbackType: {
      type: String,
      enum: ['Suggestion', 'Bug Report', 'General Comment', 'Feature Request'],
      required: true,
      trim: true
    },

    rating: {
      type: Number
    },

    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

// console.log('Feedback schema loaded:', FeedbackSchema.obj)

// if (mongoose.models.Feedback) {
//   mongoose.deleteModel('Feedback')
// }

const Feedback = mongoose.model('Feedback', FeedbackSchema)
export default Feedback
