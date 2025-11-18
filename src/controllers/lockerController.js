import Locker from '../models/Locker.js';
import { logEvents } from '../middleware/logEvents.js';

// Get all lockers
const getAllLockers = async (req, res) => {
    const lockers = await Locker.find({});
    res.json(lockers);
    logEvents(`Returned locker list`);
}

// Get a single locker by lockerID
const getLockerByID = async (req, res) => {
    const locker = await Locker.findOne({ lockerID: req.params.lockerID });
    res.json(locker);
    logEvents(`Returned locker with lockerID: ${req.params.lockerID}`);
}

// Create a new locker
const createNewLocker = async (req, res) => {
    const locker = await Locker.create(req.body);
    res.status(200).json(locker);
    logEvents(`New locker created: lockerID: ${locker.lockerID}`);
}

// Update an existing locker
const updateLocker = async (req, res) => {
    const locker = await Locker.findOneAndUpdate({ lockerID: req.body.lockerID });

    if(!locker) {
        res.status(404).json({ message: 'Locker not found' });
        logEvents(`Locker with lockerID ${req.body.lockerID} not found for update`);
        return;
    }   

    await locker.updateOne({
        lockerID: req.body.lockerID ? req.body.lockerID : locker.lockerID,
        availability: req.body.availability !== undefined ? req.body.availability : locker.availability
    });
    const updatedLocker = await Locker.findOne({ lockerID: req.body.lockerID });
    res.json(updatedLocker);
    logEvents(`Locker with lockerID ${req.body.lockerID} has been updated`);
}

// Delete a locker
const deleteLocker = async (req,res) => {
    const locker = await Locker.deleteOne({ lockerID: req.body.lockerID });
    if (!locker.deletedCount) {
        res.status(404).json({ message: 'Locker not found' });
        logEvents(`Locker with lockerID ${req.body.lockerID} not found for deletion`);
        return;
    }
    res.json({ message: 'Locker deleted successfully' });
    logEvents(`Locker with lockerID ${req.body.lockerID} has been deleted`);    
}

export {
    getAllLockers,
    getLockerByID,
    createNewLocker,
    updateLocker,
    deleteLocker
};

