import feedback from '../model/feedback.model.js'
import { logEvents } from '../middleware/logEvents.js'

// Get all feedback
const getAllFeedback = async (req, res) => {
  try {
    const reports = await feedback.find({}).sort({ createdAt: -1 })
    res.json(reports)
    logEvents(`Returned feedback list`)
  } catch (err) {
    logEvents(`Error getting all feedback: ${err.message}`)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get feedback by email
const getFeedbackByEmail = async (req, res) => {
  try {
    console.log(req.params.email)

    const { email } = req.params
    const report = await feedback.findOne({ email: email })

    if (!report) {
      res.status(404).json({ message: 'Feedback not found' })
      logEvents(`Feedback with email ${email} not found`)
      return
    }

    res.json(report)
    logEvents(`Returned feedback with email: ${email}`)
  } catch (err) {
    logEvents(`Error getting feedback by email: ${err.message}`)
    res.status(500).json({ message: 'Server error' })
  }
}

// Create new feedback
const createNewFeedback = async (req, res) => {
  try {
    let rating = req.body.rating

    if (rating < 0) rating = 0
    if (rating > 5) rating = 5
    console.log(req.body)

    await feedback.create({
      ...req.body,
      rating
    })

    logEvents(`New feedback created`)
    return res.status(200).json({ message: 'Feedback submitted successfully' })
  } catch (err) {
    logEvents(`Error creating new feedback: ${err.message}`)
    res.status(500).json({ message: 'Server error' })
  }
}

export default {
  getAllFeedback,
  getFeedbackByEmail,
  createNewFeedback
}
