const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query{
    getRecipeSuggestions(ingredients: [String]!): String
}
`;
module.exports = typeDefs