const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming we store image URLs
  },
  hashtags: {
    type: [String], // Array of strings for hashtags
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the creator
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Discussion', discussionSchema);