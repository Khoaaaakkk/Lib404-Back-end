import lockerController from '../../controllers/lockerController.js'
import express from 'express'

const router = express.Router()

// api/lockers/
router
  .route('/')
  .get(lockerController.getAllLockers)
  .post(lockerController.createNewLocker)
  .put(lockerController.updateLocker)
  .delete(lockerController.deleteLocker)

router.route('/:id').get(lockerController.getLockerByID)

export default router
