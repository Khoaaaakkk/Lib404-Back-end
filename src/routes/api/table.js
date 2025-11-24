import tableController from '../../controllers/tableController.js'
import express from 'express'

const router = express.Router()

// api/tables/
router
  .route('/')
  .get(tableController.getAllTables)
  .post(tableController.createNewTable)
  .put(tableController.updateTable)
  .delete(tableController.deleteTable)

router.route('/:tableID').get(tableController.getTableByTableID)

export default router
