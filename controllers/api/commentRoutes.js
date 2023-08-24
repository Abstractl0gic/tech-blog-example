const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// route to create a new comment
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

// route to get all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [User, Post]
        });

        const comments = commentData.map(comment => comment.get({ plain: true }));
        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
