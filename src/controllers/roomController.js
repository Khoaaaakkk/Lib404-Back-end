import Room from '../model/room.model.js'
import { logEvents } from '../middleware/logEvents.js'

// Get all rooms
const getAllRooms = async (req, res) => {
  const rooms = await Room.find({})
  res.json(rooms)
  logEvents(`Returned room list`)
}

//Get room by ID
const getRoomByID = async (req, res) => {
  console.log(req.params.roomId)

  const {id} = req.params
  const room = await Room.findOne({ roomId: id })

  if (!room) {
    res.status(404).json({ message: 'Room not found' })
    logEvents(`Room with roomID ${id} not found`)
    return
  }

  res.json(room)
  logEvents(`Returned room with roomID: ${id}`)
}

// Create new room
const createNewRoom = async (req, res) => {
  console.log(req.body)

  const room = await Room.create(req.body)
  res.status(201).json(room)
  logEvents(`Created new room with roomId: ${room.roomId}`)
}

// Update room details
const updateRoom = async (req, res) => {
  const { id } = req.params
  const room = await Room.findOne({ roomId: id })

  if (!room) {
    res.status(404).json({ message: 'Room not found' })
    logEvents(`Room with roomID ${id} not found for update`)
    return
  }

  await room.updateOne({
    roomId: req.body.roomId ? req.body.roomId : room.roomId,
    type: req.body.type ? req.body.type : room.type,
    floorId: req.body.floorId ? req.body.floorId : room.floorId
  })

  const updatedRoom = await Room.findOne({ roomId: id })
  res.json(updatedRoom)
  logEvents(`Room with roomID ${id} has been updated`)
}

// Delete room
const deleteRoom = async (req, res) => {
  const { id } = req.params
  const room = await Room.deleteOne({ roomId: id })

  if (!room.deletedCount) {
    res.status(404).json({ message: 'Room not found' })
    logEvents(`Room with roomID ${id} not found for deletion`)
    return
  }
  res.json({ message: 'Room deleted successfully' })
  logEvents(`Room with roomID ${id} has been deleted`)
}

export default {
  getAllRooms,
  getRoomByID,
  createNewRoom,
  updateRoom,
  deleteRoom
}
