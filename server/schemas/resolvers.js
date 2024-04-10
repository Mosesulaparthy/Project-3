const User = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');
const { OpenAI } = require('openai');

require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateRecipeImage(prompt) {
    try {
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });
        const imageUrl = response.data[0].url;
        return imageUrl;
    } catch (error) {
        console.error("Error generating recipe image:", error);
        throw new Error('Failed to generate recipe image due to an API error.');
    }
}

const resolvers = {
    Query: {

        getRecipeSuggestions: async (_, { ingredients }) => {
            try {
                const prompt = `Given these ingredients: ${ingredients.join(', ')}, generate a simple recipe with the steps along with youtube video link that would most closely follow the recipe`;

                const response = await openai.chat.completions.create({
                    model: "gpt-4",
                    messages: [{
                        role: "system",
                        content: "You are a helpful assistant."
                    }, {
                        role: "user",
                        content: prompt
                    }]
                });
                console.log(response.choices[0].message)
                const messageContent = response.choices[0].message.content
                return messageContent;
            } catch (error) {
                console.error("error fetching the recipe")
            }
            return getRecipeSuggestions(ingredients);
        },

        getRecipeImage: async (_, { prompt }) => {
            return generateRecipeImage(prompt)
        },

        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                });
                return user;
            }
            throw AuthenticationError;
        },
    },
    Mutation: {

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return { token, user };
        }
    }
}
module.exports = resolvers