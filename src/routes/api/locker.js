import lockerController from '../../controllers/lockerController.js'
import express from 'express'

const router = express.Router()

// api/lockers/
router
  .route('/')
  .get(lockerController.getAllLockers)
  .post(lockerController.createNewLocker)

router.route('/import').get(lockerController.importLockers) // import locker

router
  .route('/:id')
  .get(lockerController.getLockerByID)
  .delete(lockerController.deleteLocker)
  .put(lockerController.updateLocker)

router.route('/:id/clear').put(lockerController.clearLocker) // avai = true, xoa user

export default router
