import tableController from '../../controllers/tableController.js'
import importTables from './importTable.js'

import express from 'express'

const router = express.Router()

//api/tables/
<<<<<<< Updated upstream
router.route('/import').get(importTables)

=======
>>>>>>> Stashed changes
router
  .route('/')
  .get(tableController.getAllTables)
  .post(tableController.createNewTable)
<<<<<<< Updated upstream

router
  .route('/:id')
  .delete(tableController.deleteTable)
  .get(tableController.getTableByTableID)
  .put(tableController.updateTable)

router
  .route('/:id/availability')
  .put(tableController.updateTableAvailability)
=======
  .put(tableController.updateTable)

router
  .route('/:id')
  .get(tableController.getTableByTableID)
  .delete(tableController.deleteTable)
>>>>>>> Stashed changes

router.route('/import').get(importTables)
export default router
