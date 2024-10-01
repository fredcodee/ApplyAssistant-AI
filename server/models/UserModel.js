const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        default: null
    },
    password: String,
    email: {
        type: String
    },
    githubId: {
        type: String,
        default: null
    }
});


module.exports = mongoose.model('User', userSchema);
