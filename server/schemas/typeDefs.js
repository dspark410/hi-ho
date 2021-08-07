const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Hello {
    hello: String!
  }

  type Query {
    sayHello: Hello
  }
`
module.exports = { typeDefs }
