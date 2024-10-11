const mongoose = require('mongoose');

const userExperienceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    UserResumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserResume'
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobDetails',
        default: null
    },
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    description: {
        type: String,   
    },
    accomplishments: [{ type: String }],
    startDate: {                
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    }
});

module.exports = mongoose.model('UserExperience', userExperienceSchema);