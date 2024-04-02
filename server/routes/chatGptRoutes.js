const express = require('express');
const router = express.Router();
const { getRecipeSuggestions }= require('../controllers/chatGptController');

router.post('recipe-suggestions', getRecipeSuggestions);

module.exports = router
