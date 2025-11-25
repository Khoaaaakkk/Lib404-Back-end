import feedbackController from '../../controllers/feedbackController.js'
import express from 'express'

const router = express.Router()

// api/feedback/
router
  .route('/')
  .get(feedbackController.getAllFeedback)
  .post(feedbackController.createNewFeedback)

export default router
