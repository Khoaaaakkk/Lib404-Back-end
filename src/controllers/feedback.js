import feedback from '../model/feedback.js';
import { logEvents } from '../middleware/logEvents.js';

// Get all feedback
const getAllFeedback = async (req, res) => {
    const reports = await feedback.find({});
    res.json(reports);
    logEvents(`Returned feedback list`);
}

// Get feedback by email
const getFeedbackByEmail = async (req, res) => {
    const report = await feedback.findOne({ email: req.params.email });
    res.json(report);
    logEvents(`Returned feedback with email: ${req.params.email}`);
}

// Create new feedback
const createNewFeedback = async (req, res) => {
    let { rating } = req.body;

    if (rating < 0) rating = 1;
    if (rating > 5) rating = 5;

    const report = await feedback.create({
        ...req.body,
        rating
    });

    res.status(201).json(report);
    logEvents(`Created new feedback with email: ${report.email}, rating: ${report.rating}`);
};


export default{
    getAllFeedback,
    getErrorReportByEmail,
    createNewErrorReport,
}