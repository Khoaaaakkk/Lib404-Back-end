// const { logEvents } = require('../middleware/logEvents')
// const User = require('../model/users.model')

// const bcrypt = require('bcrypt')

// const jwt = require('jsonwebtoken')

// require('dotenv').config()

import { logEvents } from '../middleware/logEvents.js'
import User from '../model/users.model.js'
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

const handleLogin = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' })
  }

  const foundUser = await User.findOne({ username: username })
  if (!foundUser) {
    logEvents(`Login failed: User ${username} not found!`) // username not found
    return res
      .status(404)
      .json({ message: `No User with username ${username}` }) // Unauthorized
  }

  const match = await bcrypt.compare(password, foundUser.password)
  if (match) {
    // create JWTs

    // console.log(process.env.ACCESS_TOKEN_SECRET)
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '300s' }
    )

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )
    // Saving refreshToken with current user
    await User.findOneAndUpdate(
      { username: foundUser.username },
      { refreshToken: refreshToken }
    )

    logEvents(`User ${username} logged in successfully!`) // successful login
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 1000 // 12 hours in milliseconds
    })
    res
      // .json({ message: `User ${username} logged in` })
      .json({ accessToken })
  } else {
    logEvents(`User ${username} failed to log in!`) // incorrect password
    res.status(401).json({ message: 'Unauthorized' })
  }
}

export default { handleLogin }
// module.exports = { handleLogin }
