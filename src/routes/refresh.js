// const refreshTokenController = require('../controllers/refreshTokenController')
// const express = require('express')

import refreshTokenController from '../controllers/refreshTokenController.js'
import express from 'express'
const router = express.Router()

// /auth
router.get('/', refreshTokenController.handleRefreshToken)

export default router
// module.exports = router
