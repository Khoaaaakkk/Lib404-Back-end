const whitelist = [
  'http://localhost:3000',
  'https://lib4-uit-front-end.vercel.app',
  'https://libdot404-git-development-anh-khoas-projects-f612374c.vercel.app', // development
  'https://lib404.vercel.app' // production
]
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
      // logEvents('Not allowed by CORS', 'reqLog.txt')
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

export default corsOptions

// module.exports = corsOptions
