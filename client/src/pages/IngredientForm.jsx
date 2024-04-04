import React, { useState } from 'react';

function IngredientsForm() {

  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/recipe-suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: ingredients.split(',').map(ingredient => ingredient.trim()) }),
    });
    const data = await response.json();
    if (data.recipe) {
      setRecipe(data.recipe);
    } else {
      console.error('No recipe found');
      setRecipe('');
    }
  };

  return (
    <div>

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

      {recipe && (
        <div>
          <h2>Recipe Suggestion</h2>
          <p>{recipe}</p>
        </div>
      )}

    </div>
  );
}

export default IngredientsForm;
