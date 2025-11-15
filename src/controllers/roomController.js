import Room from '../model/room.model.js';
import { logEvents } from '../middleware/logEvents.js'; 

// Get all rooms
const getAllRooms = async (req, res) => {
    const rooms = await Room.find({});
    res.json(rooms);
    logEvents(`Returned room list`);
}

//Get room by ID
const getRoomByID = async (req, res) => {
    const room = await Room.findOne({ roomID: req.params.roomID });
    if (!room) {
        res.status(404).json({ message: 'Room not found' });
        logEvents(`Room with roomID ${req.params.roomID} not found`);
        return;
    }

    res.json(room);
    logEvents(`Returned room with roomID: ${req.params.roomID}`);
}

// Create new room
const createNewRoom = async (req, res) => {
    const room = await Room.create(req.body);
    res.status(201).json(room);
    logEvents(`Created new room with roomID: ${room.roomID}`);
}   

// Update room details
const updateRoom = async (req, res) => {
    const room = await Room.findOne({ roomID: req.body.roomID });
    if (!room) {
        res.status(404).json({ message: 'Room not found' });
        logEvents(`Room with roomID ${req.body.roomID} not found for update`);
        return;
    }

    await room.updateOne({
        roomID: req.body.roomID ? req.body.roomID : room.roomID,
        type: req.body.type ? req.body.type : room.type,
        floorID: req.body.floorID ? req.body.floorID : room.floorID
    });

    const updatedRoom = await Room.findOne({ roomID: req.body.roomID });
    res.json(updatedRoom);
    logEvents(`Room with roomID ${req.body.roomID} has been updated`);
}

// Delete room
const deleteRoom = async (req, res) => {
    const room = await Room.deleteOne({ roomID: req.body.roomID });
    if (!room.deletedCount) {
        res.status(404).json({ message: 'Room not found' });
        logEvents(`Room with roomID ${req.body.roomID} not found for deletion`);
        return;
    }
    res.json({ message: 'Room deleted successfully' });
    logEvents(`Room with roomID ${req.body.roomID} has been deleted`);
}

export default { getAllRooms, getRoomByID, createNewRoom, updateRoom, deleteRoom };
