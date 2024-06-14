// controllers/DiscussionController.js
const Discussion = require('../models/Discussion');


const createDiscussion = async (req, res) => {
  console.log(req.body);
  const userId = req.params.userId;
  const { text, image, hashtags } = req.body;

  try {
    // Create a new discussion
    const newDiscussion = new Discussion({
      text,
      image,
      hashtags: hashtags.split(',').map(tag => tag.trim()),
      userId,
    });

    await newDiscussion.save();

    // Redirect back to the profile page
    res.redirect(`/profile/${userId}`);
  } catch (error) {
    console.error('Error posting discussion:', error);
    res.status(500).send('Error posting discussion');
  }
};

module.exports = {
  createDiscussion
};
