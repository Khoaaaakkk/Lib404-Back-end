import roomController from '../../controllers/roomController.js'
import express from 'express'

const router = express.Router()

// api/rooms/
router
  .route('/')
  .get(roomController.getAllRooms)
  .post(roomController.createNewRoom)

router
  .route('/:roomID')
  .get(roomController.getRoomByID)
  .put(roomController.updateRoom)
  .delete(roomController.deleteRoom)

export default router
