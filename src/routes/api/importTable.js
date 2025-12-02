import Table from '../../model/table.model.js'
import { logEvents } from '../../middleware/logEvents.js'

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
        roomId: 103,
        availability: true
      })
    }

    // Room 104
    for (let id = 135; id <= 137; id++) {
      Table.create({
        tableId: id,
        type: 'group', // vì >133
        roomId: 104,
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

export default importTables
