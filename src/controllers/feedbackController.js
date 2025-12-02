import feedback from '../model/feedback.model.js';
import { logEvents } from '../middleware/logEvents.js';

// Get all feedback
const getAllFeedback = async (req, res) => {
    try {
        const reports = await feedback.find({});
        res.json(reports);
        logEvents(`Returned feedback list`);
    } catch (err) {
        logEvents(`Error getting all feedback: ${err.message}`);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get feedback by email
const getFeedbackByEmail = async (req, res) => {
    try {
        console.log(req.params.email);
        
        const { email } = req.params;
        const report = await feedback.findOne({ email: email });

        if (!report) {
            res.status(404).json({ message: 'Feedback not found' });
            logEvents(`Feedback with email ${email} not found`);
            return;
        }

        res.json(report);
        logEvents(`Returned feedback with email: ${email}`);
    } catch (err) {
        logEvents(`Error getting feedback by email: ${err.message}`);
        res.status(500).json({ message: 'Server error' });
    }
}

// Create new feedback
const createNewFeedback = async (req, res) => {
    try {
        let rating = req.body.rating;

        if (rating < 0) rating = 1;
        if (rating > 5) rating = 5;

        const report = await feedback.create({
            ...req.body,
            rating
        });

        res.status(201).json(report);
        logEvents(`Created new feedback with email: ${report.email}, rating: ${report.rating}`);
    } catch (err) {
        logEvents(`Error creating new feedback: ${err.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

export default{
    getAllFeedback,
    getFeedbackByEmail,
    createNewFeedback,
}
