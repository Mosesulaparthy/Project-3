import {gql} from '@apollo/client'

export const GET_RECIPE_SUGGESTIONS = gql`
  query GetRecipeSuggestions($ingredients: [String]!) {
    getRecipeSuggestions(ingredients: $ingredients)
  }
`;