const router = require('express').Router();
const { User } = require('../../models');

// Define your routes
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
