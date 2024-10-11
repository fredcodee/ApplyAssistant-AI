const mongoose = require('mongoose');

const jobDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName: {
        type: String
    },
    jobDescription: {
        type: String
    },
    jobRequirements: {
        type: String
    },
    technologies: [{ type: String }],
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
    progress: { type:String, default: "Pending" }, // applied, onGoing, interviewing, negotiating, accepted, rejected
    salary: { type:String }
});

module.exports = mongoose.model('JobDetails', jobDetailsSchema);