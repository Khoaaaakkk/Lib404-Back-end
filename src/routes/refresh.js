import refreshTokenController from '../controllers/refreshTokenController.js'
import express from 'express'
const router = express.Router()

// /refresh
router.get('/', refreshTokenController.handleRefreshToken)

export default router
