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

  const lockerID = parseInt(req.params.lockerId, 10)
  const locker = await Locker.findOne({ lockerId: req.params.id })

  if (!locker) {
    res.status(404).json({ message: 'Locker not found' })
    logEvents(`Locker with lockerID ${req.params.id} not found`)
    return
  }

  res.json(locker)
  logEvents(`Returned locker with lockerID: ${req.params.id}`)
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
  const locker = await Locker.findOne({ lockerId: id })

  if (!locker) {
    res.status(404).json({ message: 'Locker not found' })
    logEvents(`Locker with lockerID ${id} not found for update`)
    return
  }

  await locker.updateOne({
    lockerID: req.body.lockerId ? req.body.lockerId : locker.lockerId,
    availability:
      req.body.availability !== undefined
        ? req.body.availability
        : locker.availability
  })
  const updatedLocker = await Locker.findOne({ lockerId: id })
  res.json(updatedLocker)
  logEvents(`Locker with lockerID ${id} has been updated`)
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

export default {
  getAllLockers,
  getLockerByID,
  createNewLocker,
  updateLocker,
  deleteLocker
}
