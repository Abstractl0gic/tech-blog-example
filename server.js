const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3001;

// use handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.listen(process.env.PORT || 3001)

// set up a 1-hour session and store using Sequelize
const sess = {
  secret: 'e96ae2848b954555f44163b11339ed7f29ca24705607b4f4396abdf664f709f8', 
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
    // start the express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
