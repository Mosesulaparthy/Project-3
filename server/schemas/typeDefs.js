// const { gql } = require('apollo-server-express');

const typeDefs = `
type Query{
    getRecipeSuggestions(ingredients: [String]!): String
}
`;
module.exports = typeDefs