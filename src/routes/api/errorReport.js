import errorReportController from '../../controllers/errorReportController.js';
import express from 'express';

const router = express.Router()

// api/errorReports/
router
    .route('/') 
    .get(errorReportController.getAllErrorReports)
    .post(errorReportController.createNewErrorReport)

router.route('/:email').get(errorReportController.getErrorReportByEmail);

export default router;