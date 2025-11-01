// const User = require('../src/model/users.model')

// const bcrypt = require('bcrypt')
// const { logEvents } = require('../src/middleware/logEvents')

import User from '../model/users.model.js'
import bcrypt from 'bcrypt'
import { logEvents } from '../middleware/logEvents.js'

const handleNewUser = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' })
  }

  // check for duplicate usernames in the db
  const duplicateUser = await User.findOne({ username: username })
  if (duplicateUser) {
    logEvents('Failed to register user, username already exists: ' + username)
    return res.status(409).json({ message: 'Username already exists' })
  }

  try {
    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // store new user
    await User.create({
      username: username,
      password: hashedPassword
    })

    res.status(201).json({ message: `New user ${username} created` })
    logEvents(`New user registered: ${username}`)
  } catch (error) {
    logEvents(error.message, 'errorLog.txt')
    return res.status(500).json({ message: error.message })
  }
}

export default { handleNewUser }
// module.exports = { handleNewUser }
