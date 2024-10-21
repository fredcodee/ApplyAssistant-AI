const mongoose = require('mongoose');

const jobDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName: {
        type: String
    },
    jobTitle: {
        type: String
    },
    jobDescription: {
        type: String
    },
    postUrl: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    companywebsite: {
        type: String
    },
    progress: { type:String, default: "Pending" }, // Applied, OnGoing, Interviewing, Negotiating, Accepted, Rejected
    salary: { type:String }
});

module.exports = mongoose.model('JobDetails', jobDetailsSchema);