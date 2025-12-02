import Table from '../../model/table.model.js'
import { logEvents } from '../../middleware/logEvents.js'

// Import tables into the database
const importTables = async (req, res) => {
  console.log('ok')

  try {
<<<<<<< Updated upstream
    await Table.deleteMany({}) // xóa toàn bộ collection trước
    // Room 101
    console.log('import 1-31')
    for (let id = 1; id <= 31; id++) {
      Table.create({
        tableId: id,
        type: id <= 16 ? 'single' : 'group',
        roomId: 101,
=======
    const tables = []

    // Room 101
    for (let id = 1; id <= 31; id++) {
      tables.push({
        tableId: id,
        type: id <= 16 ? 'single' : 'group',
        roomID: 101,
>>>>>>> Stashed changes
        availability: true
      })
    }

<<<<<<< Updated upstream
    //Room 102
    for (let id = 32; id <= 74; id++) {
      Table.create({
        tableId: id,
        type: id <= 71 ? 'single' : 'group',
        roomId: 102,
=======
    // Room 102
    for (let id = 32; id <= 74; id++) {
      tables.push({
        tableId: id,
        type: id <= 71 ? 'single' : 'group',
        roomID: 102,
>>>>>>> Stashed changes
        availability: true
      })
    }

    // Room 103
<<<<<<< Updated upstream
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
=======
    for (let id = 75; id <= 135; id++) {
      tables.push({
        tableId: id,
        type: id <= 133 ? 'single' : 'group',
        roomID: 103,
        availability: true
      })

      // Room 104
      for (let id = 135; id <= 137; id++) {
        tables.push({
          tableId: id,
          type: id <= 133 ? 'single' : 'group',
          roomID: 104,
          availability: true
        })
      }
    }

    const inserted = await Table.insertMany(tables)
    res
      .status(200)
      .json({ message: 'Tables imported successfully', count: inserted.length })
    logEvents(`Imported ${inserted.length} tables into database`)
  } catch (error) {
    console.error('Error importing tables:', error.message)
    res.status(500).json({ message: 'Server error during import' })
>>>>>>> Stashed changes
  }
}

export default importTables
