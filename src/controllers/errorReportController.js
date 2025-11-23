import errorReport from '../model/errorReport.model.js';
import { logEvents } from '../middleware/logEvents.js';

// Get all error reports
const getAllErrorReports = async (req, res) => {
    const reports = await errorReport.find({});
    res.json(reports);
    logEvents(`Returned error report list`);
}

// Get error report by email
const getErrorReportByEmail = async (req, res) => {
    const report = await errorReport.findOne({ email: req.params.email });
    res.json(report);
    logEvents(`Returned error report with email: ${req.params.email}`);
}

// Create new error report
const createNewErrorReport = async (req, res) => {
    let { rating } = req.body;

    if (rating < 0) rating = 1;
    if (rating > 5) rating = 5;

    const report = await errorReport.create({
        ...req.body,
        rating
    });

    res.status(201).json(report);
    logEvents(`Created new error report with email: ${report.email}, rating: ${report.rating}`);
};


export default{
    getAllErrorReports,
    getErrorReportByEmail,
    createNewErrorReport,
}