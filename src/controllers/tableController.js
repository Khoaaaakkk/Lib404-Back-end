import Table from '../model/table.model.js'
import { logEvents } from '../middleware/logEvents.js'
import { log } from 'console'

// Get all tables
const getAllTables = async (req, res) => {
  const tables = await Table.find({})

  res.json(tables)

  logEvents(`Returned table list`)
}

// Get a single table by tableID
const getTableByTableID = async (req, res) => {
  console.log(req.params.id)

  const { id } = req.params
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
  const user = req.body.username
  const table = await Table.findOne({ tableId: id })

  if (!table) {
    res.status(404).json({ message: 'Table not found' })
    logEvents(`Table with tableID ${id} not found for update`)
    return
  }

  if (!user) {
    res.status(400).json({ message: 'Username is required to update table' })
    logEvents(`No username provided to update table with tableID ${id}`)
    return
  }

  if (table.availability === true) {
    table.username = user
    table.availability = false
    await table.save()
    res.json(table)
    logEvents(`Table with tableID ${id} has been assigned to user ${user}`)
  } else {
    logEvents(`Table with tableID ${id} is not available for user ${user}`)
    res.status(400).json({ message: 'Table is not available' })
    return
  }
  // // Update the table fields
  // await table.updateOne({
  //   tableID: req.body.tableId ? req.body.tableId : table.tableId,
  //   type: req.body.type ? req.body.type : table.type,
  //   roomID: req.body.roomId ? req.body.roomId : table.roomId,
  //   availability:
  //     req.body.availability !== undefined
  //       ? req.body.availability
  //       : table.availability,
  //   date: req.body.date ? req.body.date : table.date
  // })
  // // Fetch the updated table
  // const updatedTable = await Table.findOne({ tableId: id })
  // res.json(updatedTable)
  logEvents(`Table with tableID ${id} has been updated`)
}

//Clear table assignment
const clearTable = async (req, res) => {
  const { id } = req.params
  const {username,pin} = req.body
  const authHeader = req.headers['authorization']

  //find table by tableId
  const table = await Table.findOne({ tableId: id })
  if (!table) {
    res.status(404).json({ message: 'Table not found' })
    logEvents(`Table with tableID ${id} not found for clearing`)
    return
  }

  //check availability
  if (table.availability === true) {
    res.status(400).json({ message: 'Table is already available' })
    logEvents(`Table with tableID ${id} is already available`)
    return
  }

  //if table has been asigned for 1 hour, auto clear
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
  if (table.date < oneHourAgo) {
    table.username = null
    table.availability = true
    await table.save()
    res.json({ message: `Table with tableID ${id} has been auto-cleared after 1 hour` })
    logEvents(`Table with tableID ${id} has been auto-cleared after 1 hour`)
    return
  }

  //if has access token -> justify by JWT
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    if (decoded.username !== table.username) {
      logEvents(`Unauthorized clear attempt on tableID ${id} by user ${decoded.username}`)
      return res.status(403).json({ message: 'Forbidden: You can only clear your own table assignments' })
    }

    //clear by token
    table.username = null
    table.availability = true
    await table.save()
    res.json({ message: `Table with tableID ${id} has been cleared by user ${decoded.username}` })
    logEvents(`Table with tableID ${id} has been cleared by user ${decoded.username} using access token`)
    return
  }

  //if no token -> require username and pin
  if (!username || !pin) {
    res.status(400).json({ message: 'Username and pin are required to clear table' })
    logEvents(`No username or pin provided to clear table with tableID ${id}`)
    return
  }

  if (username !== table.username) {
    logEvents(`Clear failed: username mismatch for table ${id}`)
    return res.status(403).json({ message: 'Username mismatch' })
  }

  const pinMatch = await bcrypt.compare(pin, table.hashedPin)
  if (!pinMatch) {
    logEvents(`Clear failed: incorrect pin for table ${id}`)
    return res.status(403).json({ message: 'Incorrect pin' })
  }

  //clear by pin
  table.username = null
  table.availability = true
  await table.save()
  res.json({ message: `Table with tableID ${id} has been cleared by user ${username}` })
  logEvents(`Table with tableID ${id} has been cleared by user ${username} using pin`)
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

// Import tables into the database
const importTables = async (req, res) => {
  console.log('ok')

  try {
    await Table.deleteMany({}) // xóa toàn bộ collection trước
    // Room 101
    console.log('import 1-31')
    for (let id = 1; id <= 31; id++) {
      Table.create({
        tableId: id,
        type: id <= 16 ? 'single' : 'group',
        roomId: 101,
        availability: true
      })
    }

    //Room 102
    for (let id = 32; id <= 74; id++) {
      Table.create({
        tableId: id,
        type: id <= 71 ? 'single' : 'group',
        roomId: 102,
        availability: true
      })
    }

    // Room 103
    for (let id = 75; id <= 134; id++) {
      Table.create({
        tableId: id,
        type: id <= 133 ? 'single' : 'group',
        roomId: 201,
        availability: true
      })
    }

    // Room 104
    for (let id = 135; id <= 137; id++) {
      Table.create({
        tableId: id,
        type: 'group', // vì >133
        roomId: 202,
        availability: true
      })
    }

    res.status(200).json({
      message: 'Tables imported successfully',
      count: inserted.length
    })
  } catch (error) {
    console.error('Error importing tables:', error)
    res
      .status(500)
      .json({ message: 'Server error during import', error: error.message })
  }
}

// Get table controller exports
export default {
  getAllTables,
  createNewTable,
  deleteTable,
  getTableByTableID,
  updateTable,
  clearTable,
  importTables
}
