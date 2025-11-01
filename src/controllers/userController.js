// const User = require('../model/users.model')

// const { logEvents } = require('../middleware/logEvents')

import User from '../model/users.model.js'
import { logEvents } from '../middleware/logEvents.js'

const getAllUsers = async (req, res) => {
  const users = await User.find({})

  res.json(users)

  logEvents(`return user List`)
}

const createNewUser = async (req, res) => {
  const user = await User.create(req.body)

  res.status(200).json(user)

  logEvents(`New user created: id: ${user.id}, username: ${user.username}`)
}

const updateUser = async (req, res) => {
  const user = await User.findOne({ _id: `${req.body.id}` })

  await user.updateOne({
    username: `${req.body.username ? req.body.username : user.username}`,
    password: `${req.body.password ? req.body.password : user.password}`
  })

  // wait for user to updated then respond
  const updatedUser = await User.findOne({ _id: `${req.body.id}` })
  res.json(updatedUser)

  logEvents(`User with id ${req.body.id} has been updated`)
}

const deleteUser = async (req, res) => {
  const user = await User.deleteOne({ username: `${req.body.username}` })
  if (!user.deletedCount) {
    logEvents(`User ${req.body.username} does not exist`)
    res.status(404).json({ message: 'User not found' })
    return
  }
  const users = await User.find({})

  res.json({ message: `User with id ${req.body.username} has been deleted` })

  logEvents(`User with id ${req.body.username} has been deleted`)
}
const getUser = async (req, res) => {
  const user = await User.findOne({ _id: `${req.params.id}` })

  res.json(user)

  logEvents(`return user with id: ${req.params.id}`)
}

export default { getAllUsers, createNewUser, deleteUser, getUser, updateUser }

// module.exports = {
//   getAllUsers,
//   createNewUser,
//   deleteUser,
//   getUser,
//   updateUser
// }
