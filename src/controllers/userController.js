import User from '../model/users.model.js'
import { logEvents } from '../middleware/logEvents.js'

export const getAllUsers = async (req, res) => {
  // find the user info exclude hashedPassword
  const users = await User.find({}).select('-hashedPassword')

  res.json(users)

  logEvents(`return user List`)
}

// this does not get call most of the time
export const createNewUser = async (req, res) => {
  // find the user info exclude hashedPassword
  const user = await User.create(req.body).select('-hashedPassword')

  res.status(200).json(user)

  logEvents(`New user created: _id: ${user._id}, username: ${user.username}`)
}

export const updateUser = async (req, res) => {
  const user = await User.findOne({ username: `${req.body.username}` })

  await user.updateOne({
    username: `${req.body.username ? req.body.username : user.username}`,
    password: `${req.body.password ? req.body.password : user.password}`
  })

  // wait for user to updated then respond
  const updatedUser = await User.findOne({
    username: `${req.body.username}`
  }).select('-hashedPassword')
  res.json(updatedUser)

  logEvents(`User with id ${req.body.id} has been updated`)
}

export const deleteUser = async (req, res) => {
  // find and delete user
  const user = await User.deleteOne({ username: `${req.body.username}` })

  // check if user deletion failed or not
  if (!user.deletedCount) {
    logEvents(`User ${req.body.username} does not exist`)
    return res.status(404).json({ message: 'User not found' })
  }

  logEvents(`User with id ${req.body.username} has been deleted`)
  return res.json({
    message: `User with id ${req.body.username} has been deleted`
  })
}

export const getUser = async (req, res) => {
  // find the user info exclude hashedPassword
  const user = await User.findOne({
    username: `${req.params.username}`
  }).select('-hashedPassword')

  res.json(user)

  logEvents(`return user with username: ${req.params.username}`)
}
