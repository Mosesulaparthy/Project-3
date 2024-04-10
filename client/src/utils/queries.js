import { gql } from '@apollo/client'

export const GET_RECIPE_SUGGESTIONS = gql`
  query GetRecipeSuggestions($ingredients: [String]!) {
    getRecipeSuggestions(ingredients: $ingredients)
  }
`;

export const GET_RECIPE_IMAGE = gql`
query GetRecipeImage($prompt: String!) {
  getRecipeImage(prompt: $prompt)
}
`;