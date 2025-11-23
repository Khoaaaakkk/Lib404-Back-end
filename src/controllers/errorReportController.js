import errorReport from '../models/errorReportModel.js';
import { logEvents } from '../middleware/logEvents.js';

// Get all error reports
const getAllErrorReports = async (req, res) => {
    const reports = await errorReport.find({});
    res.json(reports);
    logEvents(`Returned error report list`);
}

// Get error report by ID
const getErrorReportByID = async (req, res) => {
    const report = await errorReport.findOne({ reportID: req.params.reportID });
    res.json(report);
    logEvents(`Returned error report with ID: ${req.params.reportID}`);
}

// Create new error report
const createNewErrorReport = async (req, res) => {
    const report = await errorReport.create(req.body);
    res.status(201).json(report);
    logEvents(`Created new error report with ID: ${report.reportID}`);
}

// Update error report details
const updateErrorReport = async (req, res) => {
    const report = await errorReport.findOne({ reportID: req.body.reportID });
    if (!report) {
        res.status(404).json({ message: 'Error report not found' });
        logEvents(`Error report with ID ${req.body.reportID} not found for update`);
        return;
    }
    await report.updateOne({
        reportID: req.body.reportID ? req.body.reportID : report.reportID,
        description: req.body.description ? req.body.description : report.description,
    });
    res.json(report);
    logEvents(`Updated error report with ID: ${report.reportID}`);
}

// Delete error report
const deleteErrorReport = async (req, res) => {
    const result = await errorReport.deleteOne({ reportID: req.body.reportID });
    if (result.deletedCount === 0) {
        res.status(404).json({ message: 'Error report not found' });    
        logEvents(`Error report with ID ${req.body.reportID} not found for deletion`);
        return;
    }
    res.json({ message: 'Error report deleted' });
    logEvents(`Deleted error report with ID: ${req.body.reportID}`);
}

export {
    getAllErrorReports,
    getErrorReportByID,
    createNewErrorReport,
    updateErrorReport,
    deleteErrorReport
}