const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// GET /post/:id to retrieve a single blog post
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).render('404'); 
      // handle not found
    }
    res.render('post-detail', { post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
