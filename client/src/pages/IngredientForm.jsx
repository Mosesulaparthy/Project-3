import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import "../styles/ingredientForm.css"

const GET_RECIPE_SUGGESTIONS = gql`
  query GetRecipeSuggestions($ingredients: [String]!) {
    getRecipeSuggestions(ingredients: $ingredients)
  }
`;

function IngredientsForm() {
  const [ingredients, setIngredients] = useState('');
  const [getRecipeSuggestions, { called, loading, data }] = useLazyQuery(GET_RECIPE_SUGGESTIONS);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim());
    getRecipeSuggestions({ variables: { ingredients: ingredientList } });
  };

  return (
    <div className='userForm'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ingredients">Ingredients:</label>
        <input
          type="text"
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas"
        />
        <button type="submit">Get Recipe</button>
      </form>

      {called && loading && <p>Loading...</p>}
      {data && (
        <div>
          <h2>Recipe Suggestion:</h2>
          <p>{data.getRecipeSuggestions}</p>
        </div>
      )}
    </div>
  );
}

export default IngredientsForm;
