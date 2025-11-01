// const { logEvents } = require('../middleware/logEvents')
// const User = require('../model/users.model')

import User from '../model/users.model.js'
import { logEvents } from '../middleware/logEvents.js'

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies

  if (!cookies?.jwt) {
    return res.sendStatus(204) // No content
  }
  const refreshToken = cookies.jwt

  // wait for the DB response
  const foundUser = await User.findOne({ refreshToken: refreshToken })
  // console.log(await foundUser.username)
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sucure: true })
    return res.status(204) // logged out successfully
  }
  // Delete refreshToken in DB
  await User.findOneAndUpdate(
    { username: foundUser.username },
    { refreshToken: '' }
  )
  res.clearCookie('jwt', { httpOnly: true, sucure: true })
  logEvents(`User ${foundUser.username} logged out successfully`) // username not found
  res.sendStatus(204)
}
export default { handleLogout }
// module.exports = { handleLogout }
