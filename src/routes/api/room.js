import roomController from '../../controllers/roomController.js'
import express from 'express'

const router = express.Router()

// api/rooms/
router
  .route('/')
  .get(roomController.getAllRooms)
  .post(roomController.createNewRoom)
  .put(roomController.updateRoom)
  .delete(roomController.deleteRoom)

router.route('/:roomID').get(roomController.getRoomByID)

export default router
