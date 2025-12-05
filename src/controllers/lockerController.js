import Locker from '../model/locker.model.js'
import { logEvents } from '../middleware/logEvents.js'

// Get all lockers
const getAllLockers = async (req, res) => {
  try {
    const lockers = await Locker.find({})
    res.json(lockers)
    logEvents(`Returned locker list`)
  } catch (error) {
    logEvents(`Error getting all lockers: ${error.message}`)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get a single locker by lockerID
const getLockerByID = async (req, res) => {
  try {
    console.log(req.params.lockerId)

    const { id } = req.params
    const locker = await Locker.findOne({ lockerId: id })

    if (!locker) {
      res.status(404).json({ message: 'Locker not found' })
      logEvents(`Locker with lockerID ${id} not found`)
      return
    }

    res.json(locker)
    logEvents(`Returned locker with lockerID: ${id}`)
  } catch (error) {
    logEvents(`Error getting locker by ID: ${error.message}`)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Create a new locker
const createNewLocker = async (req, res) => {
  try {
    const locker = await Locker.create(req.body)
    res.status(200).json(locker)
    logEvents(`New locker created: lockerID: ${locker.lockerId}`)
  } catch (error) {
    logEvents(`Error creating locker: ${error.message}`)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Update an existing locker
const updateLocker = async (req, res) => {
  try {
    const { id } = req.params
    const user = req.body.username

    const locker = await Locker.findOne({ lockerId: id })

    if (!locker) {
      res.status(404).json({ message: 'Locker not found' })
      logEvents(`Locker with lockerID ${id} not found for update`)
      return
    }

    if (!user) {
      res.status(400).json({ message: 'Username is required to assign locker' })
      logEvents(`No username provided to assign locker with lockerID ${id}`)
      return
    }

    if (locker.availability === true) {
      locker.username = user
      locker.availability = false
      await locker.save()
      res.json(locker)
      logEvents(`Locker with lockerID ${id} has been assigned to user ${user}`)
    } else {
      res.status(400).json({ message: 'Locker is not available' })
      logEvents(`Locker with lockerID ${id} is not available for user ${user}`)
      return
    }

    logEvents(`Locker with lockerID ${id} has been updated with user ${user}`)
  } catch (error) {
    logEvents(`Error updating locker: ${error.message}`)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const clearLocker = async (req, res) => {
  try {
    const { id } = req.params

    const locker = await Locker.findOne({ lockerId: id })

    if (!locker) {
      res.status(404).json({ message: 'Locker not found' })
      logEvents(`Locker with lockerID ${id} not found for clearing`)
      return
    }

    if (locker.availability === false) {
      locker.username = null
      locker.availability = true
      await locker.save()
      logEvents(`Locker with lockerID ${id} cleared`)
      return res.json(locker)
    }

    logEvents(`Locker with lockerID ${id} is already available`)
    return res.status(400).json({ message: 'Locker is already available' })
  } catch (error) {
    logEvents(`Error clearing locker: ${error.message}`)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Delete a locker
const deleteLocker = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Locker.deleteOne({ lockerId: id })

    if (!deleted.deletedCount) {
      res.status(404).json({ message: 'Locker not found' })
      logEvents(`Locker with lockerID ${id} not found for deletion`)
      return
    }

    res.json({ message: 'Locker deleted successfully' })
    logEvents(`Locker with lockerID ${id} has been deleted`)
  } catch (error) {
    logEvents(`Error deleting locker: ${error.message}`)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const importLockers = async (req, res) => {
  try {
    console.log('ok')
    await Locker.deleteMany({})

    for (let id = 1; id <= 76; id++) {
      await Locker.create({ lockerId: id, availability: true })
    }

    for (let id = 77; id <= 136; id++) {
      await Locker.create({ lockerId: id, availability: true })
    }

    res.status(200).json({ message: 'Lockers imported successfully' })
  } catch (error) {
    console.error('Error importing lockers:', error)
    logEvents(`Error importing lockers: ${error.message}`)
    res.status(500).json({
      message: 'Server error during import',
      error: error.message
    })
  }
}

export default {
  getAllLockers,
  getLockerByID,
  createNewLocker,
  updateLocker,
  clearLocker,
  deleteLocker,
  importLockers
}

//locker không có thời gian, luôn check mã pin để cancel
//yêu cầu login