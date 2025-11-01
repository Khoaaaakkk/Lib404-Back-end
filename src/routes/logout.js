// const logoutController = require('../controllers/logoutController')
// const express = require('express')

import logoutController from '../controllers/logoutController.js'
import express from 'express'
const router = express.Router()

// /auth
router.get('/', logoutController.handleLogout)

export default router
// module.exports = router
