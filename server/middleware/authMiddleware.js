const jwt = require('jsonwebtoken')

exports.authMiddleware = ({ req }) => {
  let token = req.headers.authorization
  // console.log(token)
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim()
  }

  if (!token) {
    throw new Error('invalid token')
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.decoded = decoded
  } catch (err) {
    console.log(err)
    throw new Error('invalid token')
  }

  return req
}
