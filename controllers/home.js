const express = require('express');
const router = express.Router();
const { Post, User } = require('../models'); // Import your Sequelize models
    // route for displaying all blog posts on the homepage
router.get('/', async (req, res) => {
  try {
    // this retrieves and displays blog posts on the homepage
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    // creates a view to show the posts
    res.render('home', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 