const mongoose = require('mongoose');


const userProjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    UserResumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserResume'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    technologies: [{ type: String }],
    url: {
        type: String
    },
    github: {
        type: String
    }
});

module.exports = mongoose.model('UserProject', userProjectSchema);