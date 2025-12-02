import Locker from '../../model/locker.model.js'
import { logEvents } from '../../middleware/logEvents.js'

// Import lockers into the database
const importLockers = async (req, res) => {
  console.log('ok')

  try {
    await Locker.deleteMany({}) // xóa toàn bộ collection trước
    // Lockers 1-50
    console.log('import 1-76')
    for (let id = 1; id <= 76; id++) {
      await Locker.create({
        lockerId: id,
        availability: true
      })
    }

    res.status(200).json({
      message: 'Lockers imported successfully',
      count: inserted.length
    })
  } catch (error) {
    console.error('Error importing lockers:', error)
    res
      .status(500)
      .json({ message: 'Server error during import', error: error.message })
  }
}

export default importLockers
