const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models/');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    res.render('home', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
