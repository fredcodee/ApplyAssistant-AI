const mongoose = require('mongoose');

const jobKitsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobDetails'
    },
    coverLetter: {  
        type: String
    },
    message: {
        type: String
    },
    followUpMessage: {
        type: String
    }, //after 5 days of no response
    date: {
        type: Date,
        default: Date.now
    }
}); 

module.exports = mongoose.model('JobKits', jobKitsSchema);