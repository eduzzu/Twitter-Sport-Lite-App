const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    author:{
        type: String,
        required: true
    },

    title:{
        type: String,
        required: true
    },

    text:{
        type:String,
        required:true
        
    },

    category:{
        type: String,
        enum:['Football', 'Formula 1', 'MotoGP', 'Basketball', 'Handball',
            'Snooker', 'Rugby'],
            required: true
    }
})

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;