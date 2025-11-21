import {
  getAllUsers,
  createNewUser,
  deleteUser,
  getUser,
  updateUser
} from '../../controllers/userController.js'
import express from 'express'
const router = express.Router()

// api/users/
router
  .route('/')
  .get(getAllUsers)
  .post(createNewUser)
  .put(updateUser)
  .delete(deleteUser)

router.route('/:id').get(getUser)

export default router
