const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const mapToPlain = (data) => data.get({ plain: true });

async function getBlogsAndRender(res, view, logged_in, includeUser = true) {
  try {
    const blogData = await Blog.findAll({ include: includeUser ? User : null });
    const blogs = blogData.map(mapToPlain);

    res.render(view, {
      blogs,
      logged_in,
    }); // Closing curly brace was missing here
  } catch (err) {
    res.status(500).json(err);
  }
}

router.get('/', async (req, res) => {
  await getBlogsAndRender(res, 'home', req.session.logged_in); 
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: Comment, include: { model: User, attributes: ['id', 'username'] } },
        { model: User, attributes: ['id', 'username'] },
      ],
    });
    const blog = mapToPlain(blogData);

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/blog', async (req, res) => {
  await getBlogsAndRender(res, 'blog', req.session.logged_in); 
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });
    const user = mapToPlain(userData);

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) return res.redirect('/');
  res.render('signup');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) return res.redirect('/');
  res.render('login');
});

module.exports = router;
