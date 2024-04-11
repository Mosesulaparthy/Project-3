import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import "../styles/ingredientForm.css";
import { GET_RECIPE_SUGGESTIONS, GET_RECIPE_IMAGE } from "../utils/queries";
import Auth from "../utils/auth";

function IngredientsForm() {
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false); // Corrected variable name

  const [getRecipeSuggestions, { data }] = useLazyQuery(
    GET_RECIPE_SUGGESTIONS,
    {
      onCompleted: (data) => {
        const recipeTitle = data.getRecipeSuggestions.split("\n")[0];
        getRecipeImage({ variables: { prompt: recipeTitle } });
      },
    }
  );
  const [getRecipeImage] = useLazyQuery(GET_RECIPE_IMAGE, {
    onCompleted: (data) => {
      setImage(data.getRecipeImage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredientList = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
    getRecipeSuggestions({ variables: { ingredients: ingredientList } });
    setFormSubmitted(true);
  };

  const renderRecipe = (recipeText) => {
    const sections = recipeText.split("\n\n");
    return sections.map((section, index) => {
      const items = section.split("\n").filter((line) => line.trim() !== "");
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

  if (Auth.loggedIn()) {
    return (
      <div className={`userForm ${formSubmitted ? "formSubmitted" : ""}`}>
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
          <div className="recipeForm">
            <div>
              <h2>Recipe Suggestion:</h2>
              {renderRecipe(data.getRecipeSuggestions)}
            </div>
          </div>
        )}

        {image && (
          <div className="recipe-image-container">
            <h2>Recipe Image:</h2>
            <img src={image} alt="Generated Recipe" className="recipe-image" />
          </div>
        )}
      </div>
    );
  } else {
    // Redirect to login page
    window.location.replace("/login");

    // Alternatively, you can display a message prompting the user to login
    // return (
    //   <div className='login'>
    //     <h1>Please <a href="/login">login</a> in order to access our recipe search engine.</h1>
    //   </div>
    // );
  }
}

export default IngredientsForm;
