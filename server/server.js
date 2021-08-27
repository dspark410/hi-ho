const express = require('express')
const User = require('./models/User')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require('./schemas/typeDefs')
const { resolvers } = require('./schemas/resolvers')
require('dotenv').config()
const db = require('./config/connection')
const { authMiddleware } = require('./middleware/authMiddleware')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} = require('./utils/auth')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())

app.post('/refresh_token', async (req, res) => {
  // console.log(req.cookies)
  const token = req.cookies.token

  if (!token) {
    return res.send({ success: false, accessToken: '' })
  }

  let decoded

  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  } catch (err) {
    console.log(err)
    return res.send({ success: false, accessToken: '' })
  }

  // token is valid and we can send back an access token
  const user = await User.findOne({ _id: decoded.id })

  if (!user) {
    return res.send({ success: false, accessToken: '' })
  }

  //logic for clearing all tokens
  // if (user.tokenVersion !== decoded.tokenVersion) {
  //   return res.send({ ok: false, accessToken: '' })
  // }

  sendRefreshToken(res, createRefreshToken(user))

  return res.send({
    success: true,
    accessToken: createAccessToken(user),
  })
})

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  })

  await server.start()

  server.applyMiddleware({ app, cors: false })

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`)
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      )
    })
  })
}

startApolloServer()
