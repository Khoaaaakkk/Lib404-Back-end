const mongoose = require('mongoose');

const TableSchema = mongoose.Schema(
    {
        tableID: {
            type: String,
            required: true, 
            unique: true,
            trim: true
        },

        Type: {
            type: String,
            enum: ['single', 'group'],
            required: true, 
        },

        roomID: {
            type: String,
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

    {
     timestamps: {
        createdAt: 'Order_at',
        updatedAt: 'Modified_at'
     }
    }
    
);

module.exports = mongoose.model('Table', TableSchema);