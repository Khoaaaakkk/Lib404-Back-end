import tableController from '../../controllers/tableController.js'
import importTables from './importTable.js'

import express from 'express'

const router = express.Router()

//api/tables/
router
  .route('/')
  .get(tableController.getAllTables)
  .post(tableController.createNewTable)
  .put(tableController.updateTable)
  .get(tableController.getTableByTableID)
router
  .route('/:id')

  .delete(tableController.deleteTable)

router.route('/import').get(importTables)
export default router
