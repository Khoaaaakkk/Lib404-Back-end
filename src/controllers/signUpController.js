// import User from '../model/users.model.js'
// import bcrypt from 'bcrypt'
// import { logEvents } from '../middleware/logEvents.js'

// export const SignUp = async (req, res) => {
//   try {
//     // deconstruct request
//     const { username, password, email, firstName, lastName } = req.body

//     // handle missing value on registration
//     if (!username || !password || !email || !firstName || !lastName) {
//       return res
//         .status(400)
//         .json({ message: 'Username and password are required' })
//     }

//     // check for duplicate usernames in the db
//     const duplicateUser = await User.findOne({ username: username })
//     if (duplicateUser) {
//       logEvents('Failed to register user, username already exists: ' + username)

//       return res.status(409).json({ message: 'Username already exists' })
//     }

//     // encrypt the password
//     const hashedPassword = await bcrypt.hash(password, 10)

//     // store new user
//     const newUser = await User.create({
//       username: username,
//       password: hashedPassword,
//       email: email,
//       displayName: `${firstName} ${lastName}`
//     })

//     // successfully create new user
//     logEvents(`New user registered: ${username}`)

//     res.status(201).json({ message: `New user ${username} created` })
//   } catch (error) {
//     // failed to create new user
//     logEvents(error.message, 'errorLog.txt')

//     return res.status(500).json({ message: error.message })
//   }
// }
