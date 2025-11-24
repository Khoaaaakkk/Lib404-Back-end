import feedbackController from '../../controllers/feedbackController.js'
import express from 'express'

const router = express.Router()

// api/feedback/
router
  .route('/')
  .get(feedbackController.getAllFeedback)
  .post(feedbackController.createNewFeedback)

router.route('/:email').get(feedbackController.getFeedbackByEmail)

export default router
