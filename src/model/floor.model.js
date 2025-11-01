const mongoose = require('mongoose');

const FloorSchema = mongoose.Schema(
    {
        floorID: {
            type: String,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true
        },

    }
);
module.exports = mongoose.model('Floor', floorSchema);
