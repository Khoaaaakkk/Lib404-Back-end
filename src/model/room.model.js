const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema(
    {
        roomID: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        type: {
            type: String,
            enum: ['silent', 'standard'],
            required: true
        },

        floorID: {
            type: String,
            ref: 'Floor',
            required: true
        },

    }

);

module.exports = mongoose.model('Room', roomSchema);
