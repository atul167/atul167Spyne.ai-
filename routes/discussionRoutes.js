const express = require('express');
const router = express.Router();
const DiscussionController = require('../controllers/discussionController');

router.get('/profile/:userId/discussions', DiscussionController.getDiscussionsByUserId);

// Route to create a new discussion
router.post('/profile/:userId/discussions', DiscussionController.createDiscussion);

module.exports = router;
