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
            type: 'silent' | 'standard',
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

export default mongoose.model('Room', RoomSchema);
