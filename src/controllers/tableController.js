import Table from '../model/table.model.js'
import { logEvents } from '../middleware/logEvents.js'

// Get all tables
const getAllTables = async (req, res) => {
  const tables = await Table.find({})

  res.json(tables)

  logEvents(`Returned table list`)
}

// Get a single table by tableID
const getTableByTableID = async (req, res) => {
  console.log(req.params.id)

  const {id} = req.params
  const table = await Table.findOne({ tableId: id })

  if (!table) {
    res.status(404).json({ message: 'Table not found' })
    logEvents(`Table with tableID ${id} not found`)
    return
  }

  res.json(table)
  logEvents(`Returned table with tableID: ${id}`)
}

// Create a new table
const createNewTable = async (req, res) => {
  const table = await Table.create(req.body)

  res.status(200).json(table)

  logEvents(`New table created: tableID: ${table.tableId}`)
}

// Update an existing table
const updateTable = async (req, res) => {
  const { id } = req.params
  const table = await Table.findOne({ tableId: id })

  if (!table) {
    res.status(404).json({ message: 'Table not found' })
    logEvents(`Table with tableID ${id} not found for update`)
    return
  }
  // Update the table fields
  await table.updateOne({
    tableID: req.body.tableId ? req.body.tableId : table.tableId,
    type: req.body.type ? req.body.type : table.type,
    roomID: req.body.roomId ? req.body.roomId : table.roomId,
    availability:
      req.body.availability !== undefined
        ? req.body.availability
        : table.availability,
    date: req.body.date ? req.body.date : table.date
  })
  // Fetch the updated table
  const updatedTable = await Table.findOne({ tableId: id })
  res.json(updatedTable)
  logEvents(`Table with tableID ${id} has been updated`)
}

//Update table availability status
const updateTableAvailability = async (req, res) => {
  const { id } = req.params
  const { availability, date } = req.body

  const table = await Table.findOneAndUpdate(
    { tableId: id },
    { availability, date },
    { new: true }
  )

  if (!table) {
    logEvents(`Table with tableID ${id} not found for availability update`)
    return res.status(404).json({ message: 'Table not found' })
  }

  res.json(table)
  logEvents(
    `Table with tableID ${id} availability updated to ${availability} on date ${date}`
  )
}

// Delete a table
const deleteTable = async (req, res) => {
  const { id } = req.params
  const deleted = await Table.deleteOne({ tableId: id })

  if (!deleted.deletedCount) {
    logEvents(`Table with tableID ${id} does not exist`)
    res.status(404).json({ message: 'Table not found' })
    return
  }

  res.json({
    message: `Table with tableID ${id} has been deleted`
  })

  logEvents(`Table with tableID ${id} has been deleted`)
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
