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
  .post(tableController.importTables)

router.route('/:tableID').get(tableController.getTableByTableID)

export default router
// module.exports = router
