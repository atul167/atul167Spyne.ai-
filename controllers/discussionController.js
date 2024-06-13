const Discussion = require('../models/Discussion');

// Get all discussions for a user profile
const getDiscussionsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const discussions = await Discussion.find({ userId });
    res.render('discussion/profileDiscussions', { discussions });
  } catch (error) {
    console.error('Error fetching discussions:', error);
    res.status(500).send('Error fetching discussions');
  }
};

// Create a new discussion
const createDiscussion = async (req, res) => {
  try {
    const { userId } = req.params;
    const { text, image, hashtags } = req.body;

    const newDiscussion = new Discussion({ userId, text, image, hashtags });
    await newDiscussion.save();

    res.redirect(`/profile/${userId}/discussions`);
  } catch (error) {
    console.error('Error creating discussion:', error);
    res.status(500).send('Error creating discussion');
  }
};

module.exports = {
  getDiscussionsByUserId,
  createDiscussion
};
