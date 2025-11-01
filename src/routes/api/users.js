// const userController = require('../../controllers/userController')
// const express = require('express')

import userController from '../../controllers/userController.js'
import express from 'express'
const router = express.Router()

// api/users/
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

router.route('/:id').get(userController.getUser)

export default router
// module.exports = router
