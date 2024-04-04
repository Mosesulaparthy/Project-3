// const { gql } = require('apollo-server-express');

const typeDefs = `
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }
type Query{
    getRecipeSuggestions(ingredients: [String]!): String
}
type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;
module.exports = typeDefs