// const registerController = require('../../controllers/registerController')
// const express = require('express')

import registerController from '../controllers/registerController.js'
import express from 'express'
const router = express.Router()
//    /register
router.post('/', registerController.handleNewUser)

export default router
// module.exports = router
