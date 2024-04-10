const typeDefs = `
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }
  type Auth {
    token: ID
    user: User
  }
type Query{
    getRecipeSuggestions(ingredients: [String]!): String
    getRecipeImage(prompt: String!): String
    user: User
}
type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;
module.exports = typeDefs