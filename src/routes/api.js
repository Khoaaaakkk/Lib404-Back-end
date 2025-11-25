import express from 'express'
import users from './api/users.js'
import table from './api/table.js'
import room from './api/room.js'
import locker from './api/locker.js'
import feedback from './api/feedback.js'

const router = express.Router()

// api/
router.use('/users', users)
router.use('/tables', table)
router.use('/rooms', room)
router.use('/lockers', locker)
router.use('/feedbacks', feedback)
export default router
// module.exports = router
