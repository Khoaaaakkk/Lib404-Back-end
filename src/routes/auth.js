// const authController = require('../../controllers/authController')
// const express = require('express')

import express from 'express'
import authController from '../controllers/authController.js'
const router = express.Router()

// /auth
router.post('/', authController.handleLogin)

export default router
// module.exports = router
