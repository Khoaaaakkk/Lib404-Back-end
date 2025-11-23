import Table from '../model/table.model.js';
import { logEvents } from '../middleware/logEvents.js';

// Get all tables
const getAllTables = async (req, res) => {
    const tables = await Table.find({});

    res.json(tables);

    logEvents(`Returned table list`);
}

// Get a single table by tableID
const getTableByTableID = async (req, res) => {
    const table = await Table.findOne({ tableID: req.params.tableID });
    res.json(table);
    logEvents(`Returned table with tableID: ${req.params.tableID}`);
}

// Create a new table
const createNewTable = async (req, res) => {
    const table = await Table.create(req.body);

    res.status(200).json(table);

    logEvents(`New table created: tableID: ${table.tableID}`);
}

// Update an existing table
const updateTable = async (req, res) => {
    const table = await Table.findOne({ tableID: req.body.tableID });

    if(!table) {
        res.status(404).json({ message: 'Table not found' });
        logEvents(`Table with tableID ${req.body.tableID} not found for update`);
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
    const updatedTable = await Table.findOne({ tableID: req.body.tableID });
    res.json(updatedTable);
    logEvents(`Table with tableID ${req.body.tableID} has been updated`);
}


//Update table availability status
const updateTableAvailability = async (req, res) => {
    const {id} = req.params;
    const { availability, date } = req.body;

    const table = await Table.findOneAndUpdate({ tableID: id }, { availability, date }, { new: true });

if (!table) {
    logEvents(`Table with tableID ${id} not found for availability update`);
    return res.status(404).json({ message: 'Table not found' });
}

    res.json(table);
    logEvents(`Table with tableID ${id} availability updated to ${availability} on date ${date}`);
}

// Delete a table
const deleteTable = async (req, res) => {
    const {id} = req.params;
    const deleted = await Table.deleteOne({ tableID: id });

    if (!deleted.deletedCount) {
        logEvents(`Table with tableID ${id} does not exist`);
        res.status(404).json({ message: 'Table not found' });
        return;
    }

    res.json({ message: `Table with tableID ${id} has been deleted` });

    logEvents(`Table with tableID ${id} has been deleted`);
}

// Get table controller exports
export default { 
    getAllTables,   
    createNewTable,
    deleteTable,
    getTableByTableID,
    updateTable,
    updateTableAvailability
}