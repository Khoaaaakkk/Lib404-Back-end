import lockerController from '../controllers/lockerController.js';
import express from 'express';

const router = express.Router();

// Get all lockers
router.get('/', lockerController.getAllLockers);    

// Get locker by lockerID
router.get('/:lockerID', lockerController.getLockerByID);

// Create new locker
router.post('/', lockerController.createNewLocker);

// Update locker
router.put('/', lockerController.updateLocker);

// Delete locker
router.delete('/', lockerController.deleteLocker);

export default router;
    