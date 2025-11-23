const mongoose = require('mongoose');

const TableSchema = mongoose.Schema(
    {
        tableID: {
            type: Number,
            required: true, 
            unique: true,
            trim: true
        },

        Type: {
            type: 'single'| 'group',
            enum: ['single', 'group'],
            required: true, 
        },

        roomID: {
            type: Number,
            required: true,
            ref: 'Room'
        },

        availability: {
            type: Boolean,
            default: true
        },

        date: {
            type: Date,
            default: null
        },

    },

    {timestamps: true}
    
);

export default mongoose.model('Table', TableSchema);