const express = require('express');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
    // add routes into file
const homeRoutes = require('./controllers/home');
const postRoutes = require('./controllers/post');
const commentRoutes = require('./controllers/comment');
const authRoutes = require('./controllers/auth');

app.use('/', homeRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/auth', authRoutes);

// a test for the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    // start the express server next
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    // error for failed connection
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
