import jwt from 'jsonwebtoken'
import { logEvents } from './logEvents.js'

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
  console.log(authHeader)
  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403) //invalid token
    req.user = decoded.username
    console.log(decoded)
    logEvents(`User ${req.user} accessed protected route`) // log access to protected route
    next()
  })
}

export default verifyJWT
// module.exports = verifyJWT
