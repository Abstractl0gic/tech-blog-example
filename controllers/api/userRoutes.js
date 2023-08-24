const router = require('express').Router();
const { User, Blog } = require('../../models');

// create a new user
router.post('/', async (req, res) => {
    try {
        // create a new user using the request body data
        const userData = await User.create(req.body);
        
        // save the user ID and set the user as logged in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            // respond with the user data
            res.status(200).json(userData);
        });
    } catch (err) {
        // handle errors by sending an error response
        res.status(400).json(err);
    }
});

// user login validation
router.post('/login', async (req, res) => {
    try {
        // find a user by their username from the request body
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
            // respond with an error message if the user doesn't exist
            res.status(400).json({ message: 'incorrect username or password' });
            return;
        }

        // validate the provided password
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            // respond with an error message if the password is incorrect
            res.status(400).json({ message: 'incorrect username or password' });
            return;
        }

        // get the plain user data
        const user = userData.get({ plain: true });

        // save the user ID and set the user as logged in
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            // respond with the user data and a success message
            res.json({ user, message: 'you are now logged in!' });
        });
    } catch (err) {
        // handle errors by sending an error response
        res.status(400).json(err);
    }
});

// user logout and session destruction
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // destroy the user session
        req.session.destroy(() => {
            // respond with a successful logout message
            res.status(204).end();
        });
    } else {
        // respond with an error if the user is not logged in
        res.status(404).end();
    }
});

module.exports = router;
