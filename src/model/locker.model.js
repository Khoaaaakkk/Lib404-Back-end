const mongoose = require('mongoose');

const LockerSchema = mongoose.Schema(
    {
        lockerID: {
            type: Number,
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

export default mongoose.model('Locker', LockerSchema);