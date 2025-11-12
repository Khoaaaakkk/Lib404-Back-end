import Table from '../models/tableModel.js';
import { logEvents } from '../middleware/logEvents.js';

// Get all tables
const getAllTables = async (req, res) => {
    const tables = await Table.find({});

    res.json(tables);

    logEvents(`Returned table list`);
}

// Get a single table by roomID
const getTableByRoomID = async (req, res) => {
    const table = await Table.findOne({ roomID: req.params.roomID });
    res.json(table);
    logEvents(`Returned table with roomID: ${req.params.roomID}`);
}

// Create a new table
const createNewTable = async (req, res) => {
    const table = await Table.create(req.body);

    res.status(200).json(table);

    logEvents(`New table created: id: ${table.id}, tableID: ${table.tableID}`);
}

// Update an existing table
const updateTable = async (req, res) => {
    const table = await Table.findOne({ _id: req.body.id });

    if(!table) {
        res.status(404).json({ message: 'Table not found' });
        logEvents(`Table with id ${req.body.id} not found for update`);
        return;
    }
    // Update the table fields
    await table.updateOne({
        tableID: req.body.tableID ? req.body.tableID : table.tableID,
        Type: req.body.Type ? req.body.Type : table.Type, 
        roomID: req.body.roomID ? req.body.roomID : table.roomID,
        availability: req.body.availability !== undefined ? req.body.availability : table.availability,
        date: req.body.date ? req.body.date : table.date
    });
    // Fetch the updated table
    const updatedTable = await Table.findOne({ _id: req.body.id });
    res.json(updatedTable);
    logEvents(`Table with id ${req.body.id} has been updated`);
}


