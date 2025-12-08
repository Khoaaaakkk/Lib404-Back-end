import Table from '../model/table.model.js'
import { logEvents } from '../middleware/logEvents.js'
import jwt from 'jsonwebtoken'

// Get all tables
const getAllTables = async (req, res) => {
  const tables = await Table.find({})

  res.json(tables)

  logEvents(`Returned table list`)
}

// Get a single table by tableID
const getTableByTableID = async (req, res) => {
  //nếu expiresAt < now thì clear table luôn (avai = true, xóa user) (nên hỏi lại)
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
  const { username, reservedTime } = req.body

  const table = await Table.findOne({ tableId: id }).select('-hashedPin')

  // check if table exists
  if (!table) {
    logEvents(`Table with tableID ${id} not found for update`)
    return res.status(404).json({ message: 'Table not found' })
  }

  // validate username
  if (!username) {
    logEvents(`No username provided to update table with tableID ${id}`)
    return res.status(400).json({ message: 'Username is required' })
  }
  // validate reservedTime
  if (
    !reservedTime ||
    isNaN(Number(reservedTime)) ||
    Number(reservedTime) < 30
  ) {
    logEvents(
      `Invalid reservedTime provided for table with tableID ${id} by user ${username}`
    )
    return res
      .status(401)
      .json({ message: 'Valid reservedTime (in minutes) is required' })
  }

  // check availability
  if (table.availability === false) {
    logEvents(`Table with tableID ${id} is not available for user ${username}`)
    return res.status(409).json({ message: 'Table is not available' })
  }

  //reserved time processing
  if (reservedTime && Number(reservedTime) > 0) {
    const now = new Date()
    const expires = new Date(now.getTime() + Number(reservedTime) * 60000) // convert minutes to ms
    table.expiresAt = expires
  }
  table.username = username
  table.availability = false

  await table.save()
  logEvents(`Table with tableID ${id} has been assigned to user ${username}`)
  return res.json(table)
}

//Clear table assignment
const clearTable = async (req, res) => {
  const { id } = req.params
  const { username } = req.body
  const authHeader = req.headers.authorization || req.headers.Authorization

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
  // role = admin -> clear vô điều kiện
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Token not found' })
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      req.user = decoded.username
      if (decoded.role === 'admin') {
        logEvents(`an admin ${decoded.username} has cancel the table`)
        logEvents(`Table with tableID ${id} has been canceled successfully`)
      }
    })
  } else {
    //if not admin, check username exists
    if (!username) {
      res.status(402).json({ message: 'Username required to clear table' })
      logEvents(`No username provided to clear table with tableID ${id}`)
      return
    }
    // check username match?
    if (username !== table.username) {
      logEvents(`Clear failed: username mismatch for table ${id}`)
      return res.status(403).json({ message: 'Username mismatch' })
    }
  }

  table.username = null
  table.availability = true
  table.expiresAt = new Date()
  await table.save()
  logEvents(`Table with tableID ${id} has been canceled successfully`)
  return res.status(200).json({
    message: `Table with tableID ${id} has been canceled successfully`
  })
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

    const inserted = await Table.find({})

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
