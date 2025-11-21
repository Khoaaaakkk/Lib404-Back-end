const mongoose = require('mongoose');
const { title } = require('process');

const ErrorReportSchema = mongoose.Schema(
    {
        reportID: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: 'pending' | 'in progress' | 'resolved',
            enum: ['pending', 'in progress', 'resolved'],
            default: 'pending',
            required: true
        },

        username: {
            type: String,
            required: true,
            ref: 'User'
        },
    },
        { timestamps: true }
)
    const ErrorReport = mongoose.model('ErrorReport', ErrorReportSchema);
    export default ErrorReport;