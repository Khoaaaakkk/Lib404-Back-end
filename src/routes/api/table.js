import tableController from '../../controllers/tableController.js'
import express from 'express'

const router = express.Router()

//api/tables/

router
  .route('/')
  .get(tableController.getAllTables)
  .post(tableController.createNewTable)

router.route('/import').get(tableController.importTables)

router.route('/room/:roomId').get(tableController.getTableByRoomID)

router
  .route('/:id')
  .delete(tableController.deleteTable)
  .get(tableController.getTableByTableID)
  .put(tableController.updateTable)

router.route('/:id/clear').get(tableController.clearTable) // avai = true, xoa user
export default router
