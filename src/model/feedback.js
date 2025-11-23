import mongoose from 'mongoose';

const FeedbackSchema = mongoose.Schema(
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
);

    console.log("Feedback schema loaded:", FeedbackSchema.obj);

    const Feedback = mongoose.model('Feedback', FeedbackSchema);
    export default Feedback;