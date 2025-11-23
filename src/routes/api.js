import express from 'express'
import users from './api/users.js'
import table from './api/table.js'
import room from './api/room.js'
import locker from './api/locker.js'
import errorReport from './api/errorReport.js'
import auth from './auth.js'
import logout from './logout.js'
import refresh from './refresh.js'
import signup from './signup.js'

const router = express.Router()

router.use('/users', users)
router.use('/tables', table)
router.use('/rooms', room)
router.use('/lockers', locker)
router.use('/error-reports', errorReport)
router.use('/auth', auth)
router.use('/logout', logout)
router.use('/refresh', refresh)
router.use('/signup', signup)
export default router
// module.exports = router
