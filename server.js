const express = require('express');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
const exphbs = require('express-handlebars');
const session = require('express-session');
// add routes into file
const homeRoutes = require('./controllers/home');
const postRoutes = require('./controllers/post');
const commentRoutes = require('./controllers/comment');
const authRoutes = require('./controllers/auth');

// use routes
app.use('/', homeRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/auth', authRoutes);

// use handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// set up a 1 hr session and store using Sequelize
    const sess = {
        secret: '',
        cookie: {
          maxAge: 3600000 // 1 hour
        },
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({
          db: sequelize
        })
      };
      
      app.use(session(sess));
      
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







    // import and use routes
const homeRoutes = require('./controllers/home');
const postRoutes = require('./controllers/post');
const commentRoutes = require('./controllers/comment');
const authRoutes = require('./controllers/auth');

app.use('/', homeRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/auth', authRoutes);

    // test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    // Start the express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
