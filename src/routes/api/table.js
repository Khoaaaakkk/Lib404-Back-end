import tableController from '../../controllers/tableController.js'
import express from 'express'

const router = express.Router()

//api/tables/

router
  .route('/')
  .get(tableController.getAllTables)
  .post(tableController.createNewTable)

router.route('/import').get(tableController.importTables)

router
  .route('/:id')
  .delete(tableController.deleteTable)
  .get(tableController.getTableByTableID)
  .put(tableController.updateTable)

router.route('/:id/clear').delete(tableController.clearTable) // avai = true, xoa user
export default router
