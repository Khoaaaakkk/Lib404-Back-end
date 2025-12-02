import Locker from '../model/locker.model.js'
import { logEvents } from '../middleware/logEvents.js'

// Get all lockers
const getAllLockers = async (req, res) => {
  const lockers = await Locker.find({})
  res.json(lockers)
  logEvents(`Returned locker list`)
}

// Get a single locker by lockerID
const getLockerByID = async (req, res) => {
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
}

// Create a new locker
const createNewLocker = async (req, res) => {
  const locker = await Locker.create(req.body)
  res.status(200).json(locker)
  logEvents(`New locker created: lockerID: ${locker.lockerId}`)
}

// Update an existing locker
const updateLocker = async (req, res) => {
  const { id } = req.params
  const user = req.body.username

  const locker = await Locker.findOne({ lockerId: id })

  if (!locker) {
    res.status(404).json({ message: 'Locker not found' })
    logEvents(`Locker with lockerID ${id} not found for update`)
    return
  }

  // handle no user res error
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
    // locker not available
    res.status(400).json({ message: 'Locker is not available' })
    logEvents(`Locker with lockerID ${id} is not available for user ${user}`)
  }

  // await locker.updateOne({
  //   lockerID: req.body.lockerId ? req.body.lockerId : locker.lockerId,
  //   availability:
  //     req.body.availability !== undefined
  //       ? req.body.availability
  //       : locker.availability
  // })
  // const updatedLocker = await Locker.findOne({ lockerId: id })
  // res.json(updatedLocker)
  logEvents(`Locker with lockerID ${id} has been updated with user ${user}`)
}

const clearLocker = async (req, res) => {
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
    logEvents(`Locker with lockerID ${id} is already available`)
    res.json(locker)
    return
  }

  logEvents(`Locker with lockerID ${id} is already available`)
  return res.status(400).json({ message: 'Locker is already available' })
}

// Delete a locker
const deleteLocker = async (req, res) => {
  const { id } = req.params
  const deleted = await Locker.deleteOne({ lockerId: id })

  if (!deleted.deletedCount) {
    res.status(404).json({ message: 'Locker not found' })
    logEvents(`Locker with lockerID ${id} not found for deletion`)
    return
  }

  res.json({ message: 'Locker deleted successfully' })
  logEvents(`Locker with lockerID ${id} has been deleted`)
}

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

    for (let id = 77; id <= 136; id++) {
      await Locker.create({
        lockerId: id,
        availability: true
      })
    }
  } catch (error) {
    console.error('Error importing lockers:', error)
    res
      .status(500)
      .json({ message: 'Server error during import', error: error.message })
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
