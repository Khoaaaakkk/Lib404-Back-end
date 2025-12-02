import tableController from '../../controllers/tableController.js'
import importTables from './importTable.js'

import express from 'express'

const router = express.Router()

//api/tables/

router
  .route('/')
  .get(tableController.getAllTables)
  .post(tableController.createNewTable)

router.route('/import').get(importTables)

router.route('/room/:roomId').get(tableController.getTableByRoomID)

router
  .route('/:id')
  .delete(tableController.deleteTable)
  .get(tableController.getTableByTableID)
  .put(tableController.updateTable)

router.route('/:id/availability').put(tableController.updateTableAvailability)

export default router
