const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');


router.post('/:post_id', async (req, res) => {
  try {
    const { post_id } = req.params;
    const { text } = req.body;
    const newComment = await Comment.create({
      text,
      user_id: req.session.user_id,
      post_id,
    });
    res.redirect(`/post/${post_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
