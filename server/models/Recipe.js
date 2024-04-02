const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    ingredients: [{
        type: String, 
        required: true
    }], 
    steps: [{
        step: String
    }], 
});
module.exports = mongoose.model('Recipe', recipeSchema)