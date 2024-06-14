const mongoose = require("mongoose");

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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Discussion", discussionSchema);
