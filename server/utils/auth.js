const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.createAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, tokenVersion: user.tokenVersion },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '4d', //change to 5 mins
    }
  )
}

exports.createRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  )
}

exports.sendRefreshToken = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    path: '/refresh_token',
  })
}
