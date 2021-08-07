const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require('./schemas/typeDefs')
const { resolvers } = require('./schemas/resolvers')
require('dotenv').config()
const db = require('./config/connection')

const PORT = process.env.PORT || 5000
const app = express()

let server
const startApolloServer = async () => {
  server = new ApolloServer({ typeDefs, resolvers })
  await server.start()
  server.applyMiddleware({ app })
}

startApolloServer()

app.get('/', (req, res) => res.send('server running..'))

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`)
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  })
})
