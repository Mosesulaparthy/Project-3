const fetch = require('node-fetch');

const ChatGptApiUrl = 'https://api.openai.com/v4/completions'
const API_KEY = process.env.CHAT_GPT_API_KEY;

const resolvers = {
    Query: {
        getRecipeSuggestions: async (_, { ingredients }) => {
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
                });
                const data = await response.json();
                if (data.choices && data.choices.length > 0) {
                    const recipeText = data.choices[0].text.trim();
                    return recipeText;
                } else {
                    throw new Error('Failed to fetch recipe suggestions.');
                }
            } catch (error) {
                console.error('Error fetching recipe suggestions:', error);
                throw new Error('error');
            }
        }
    }
}
module.exports = resolvers