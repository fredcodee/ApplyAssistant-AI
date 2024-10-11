const mongoose = require('mongoose');

const userResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  github: {
    type: String,
    trim: true
  },
  portfolio: {
    type: String,
  },
  skills: [{ type: String }], // Using array of strings instead of type: Array
  bio: {
    type: String,
  },
  education: {
    type: String,
  }
});

module.exports = mongoose.model('UserResume', userResumeSchema);
