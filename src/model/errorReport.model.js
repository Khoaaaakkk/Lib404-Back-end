import mongoose from 'mongoose';

const ErrorReportSchema = mongoose.Schema(
    {
        username: {
            type: String,
            ref: 'User'
        },

        email: {
            type: String,
            ref: 'User',
        },

        feedbackType: {
            type: String,
            enum: ['Suggestion', 'Bug Report', 'General Comment', 'Feature Request'],
            required: true,
            trim: true
        },

        rating: {
            type: Number,
        },

        message: {
            type: String,
            required: true
        },
    },
        { timestamps: true }
)
    const ErrorReport = mongoose.model('ErrorReport', ErrorReportSchema);
    export default ErrorReport;