import lockerController from '../../controllers/lockerController.js'
import express from 'express'

const router = express.Router()

// api/lockers/
router
  .route('/')
  .get(lockerController.getAllLockers)
  .post(lockerController.createNewLocker)

router
  .route('/:id')
  .get(lockerController.getLockerByID)
  .delete(lockerController.deleteLocker)
  .put(lockerController.updateLocker)
export default router
