const fetch = require('node-fetch');

const ChatGptApiUrl = 'https://api.openai.com/v4/completions';
const API_KEY = process.env.CHAT_GPT_API_KEY;

exports.getRecipeSuggestions = async (req, res) => {
    const { ingredients } = req.body;

    try {
        const response = await fetch(ChatGptApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            }, 
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `Given these ingredients: ${ingredients.join(', ')}, generate a simple recipe:`,
                temperature: 0.7,
                max_tokens: 150,
            }),
        })
        const data = await response.json();
        if (data.choices && data.choices.length > 0){
            const recipeText= data.choices[0].text.trim();
            res.json({recipe: recipeText});
        } else {
            throw new Error('error')
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'error' })
    }
}