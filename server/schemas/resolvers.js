const User = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');
const { OpenAI } = require('openai');

require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// async function getRecipeSuggestions(ingredients) {
//     try {
//         const prompt = `Given these ingredients: ${ingredients.join(', ')}, generate a simple recipe with the steps along with youtube video`;

//         const response = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [{
//                 role: "system",
//                 content: "You are a helpful assistant."
//             }, {
//                 role: "user",
//                 content: prompt
//             }]
//         });
//         console.log(response.choices[0].message)
//         // if (!response.data || !response.data.choices || response.data.choices.length === 0) {
//         //     console.error('Unexpected response format:', response);
//         //     return "I'm sorry, I couldn't generate a recipe with those ingredients.";
//         // }
       
//         const messageContent = response.choices[0].message
//         return messageContent;

//     } catch (error) {
//         console.error("error fetching the recipe")
//     }
// }


const resolvers = {
    Query: {

        getRecipeSuggestions: async (_, { ingredients }) => {
            try {
                const prompt = `Given these ingredients: ${ingredients.join(', ')}, generate a simple recipe with the steps along with youtube video`;
        
                const response = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{
                        role: "system",
                        content: "You are a helpful assistant."
                    }, {
                        role: "user",
                        content: prompt
                    }]
                });
                console.log(response.choices[0].message)
                // if (!response.data || !response.data.choices || response.data.choices.length === 0) {
                //     console.error('Unexpected response format:', response);
                //     return "I'm sorry, I couldn't generate a recipe with those ingredients.";
                // }
               
                const messageContent = response.choices[0].message.content
                return messageContent;
        
            } catch (error) {
                console.error("error fetching the recipe")
            }

            return getRecipeSuggestions(ingredients);
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