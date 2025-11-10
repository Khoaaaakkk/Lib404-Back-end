const mongoose = require('mongoose');

const LockerSchema = mongoose.Schema(
    {
        lockerID: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        status: {
            type: Boolean,
            default: false,
            required: true
        },
    }
);

module.exports = mongoose.model('Locker', LockerSchema);