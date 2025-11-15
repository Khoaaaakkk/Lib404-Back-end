import express from 'express'
import users from './api/users.js'
import table from './api/table.js'

const router = express.Router()

router.use('/users', users)
router.use('/tables', table)
export default router
// module.exports = router
