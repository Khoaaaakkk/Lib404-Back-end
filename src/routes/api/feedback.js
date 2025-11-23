import feedback from '../../controllers/feedback.js';
import express from 'express';

const router = express.Router()

// api/feedback/
router
    .route('/') 
    .get(feedback.getAllFeedback)
    .post(feedback.createNewFeedback)

router.route('/:email').get(feedback.getFeedbackByEmail);

export default router;