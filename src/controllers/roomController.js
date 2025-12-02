import Room from '../model/room.model.js'
import { logEvents } from '../middleware/logEvents.js'

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({})
    res.json(rooms)
    logEvents(`Returned room list`)
  } catch (error) {
    console.error('Error fetching rooms:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get room by ID
const getRoomByID = async (req, res) => {
  try {
    const { id } = req.params
    const room = await Room.findOne({ roomId: id })

    if (!room) {
      res.status(404).json({ message: 'Room not found' })
      logEvents(`Room with roomID ${id} not found`)
      return
    }

    res.json(room)
    logEvents(`Returned room with roomID: ${id}`)
  } catch (error) {
    console.error('Error fetching room:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Create new room
const createNewRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body)
    res.status(201).json(room)
    logEvents(`Created new room with roomId: ${room.roomId}`)
  } catch (error) {
    console.error('Error creating room:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Update room details
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params
    const room = await Room.findOne({ roomId: id })

    if (!room) {
      res.status(404).json({ message: 'Room not found' })
      logEvents(`Room with roomID ${id} not found for update`)
      return
    }

    await room.updateOne({
      roomId: req.body.roomId ?? room.roomId,
      type: req.body.type ?? room.type,
      floorId: req.body.floorId ?? room.floorId
    })

    const updatedRoom = await Room.findOne({ roomId: id })
    res.json(updatedRoom)

    logEvents(`Room with roomID ${id} has been updated`)
  } catch (error) {
    console.error('Error updating room:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Delete room
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Room.deleteOne({ roomId: id })

    if (!deleted.deletedCount) {
      res.status(404).json({ message: 'Room not found' })
      logEvents(`Room with roomID ${id} not found for deletion`)
      return
    }

    res.json({ message: 'Room deleted successfully' })
    logEvents(`Room with roomID ${id} has been deleted`)
  } catch (error) {
    console.error('Error deleting room:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export default {
  getAllRooms,
  getRoomByID,
  createNewRoom,
  updateRoom,
  deleteRoom
}
