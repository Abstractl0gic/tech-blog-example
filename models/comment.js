const express = require('express');
const router = express.Router();
const { Comment, User, Post } = require('../models'); // Import your Sequelize models
// route for adding comment to a blog post
router.post('/:post_id', async (req, res) => {
  try {
    const { post_id } = req.params;
    const { text } = req.body;
    // create a comment and put it in the database
    const newComment = await Comment.create({
      text,
      user_id: req.session.user_id, 
    // adding to try and use a session based authentication
      post_id
    });
    // go back to the post if need be
    res.redirect(`/post/${post_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
