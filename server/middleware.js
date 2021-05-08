const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const withAuth = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    res.status(401).send('Unauthorized: No token provided')
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token')
      } else {
        req.username = decoded.username
        req.fullname = decoded.fullname
        next()
      }
    })
  }
}
module.exports = withAuth
