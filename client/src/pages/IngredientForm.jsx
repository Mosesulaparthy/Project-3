import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import "../styles/ingredientForm.css"
import { GET_RECIPE_SUGGESTIONS } from '../utils/queries';


function IngredientsForm() {
  const [ingredients, setIngredients] = useState('');
  const [getRecipeSuggestions, {data }] = useLazyQuery(GET_RECIPE_SUGGESTIONS);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim());
    getRecipeSuggestions({ variables: { ingredients: ingredientList } });
  };

  const renderRecipe = (recipeText) => {
    const sections = recipeText.split('\n\n');
    return sections.map((section, index) => {
      const items = section.split('\n').filter(line => line.trim() !== '');
      if (items.length > 1) {
        const title = items[0];
        const listItems = items.slice(1);
        return (
          <div key={index}>
            <h3>{title}</h3>
            <ul>
              {listItems.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        return <p key={index}>{section}</p>;
      }
    });
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

      {data && (
        <div>
          <h2>Recipe Suggestion:</h2>
          {renderRecipe(data.getRecipeSuggestions)}
        </div>
      )}
    </div>
  );
}

export default IngredientsForm;
