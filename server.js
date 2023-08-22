const express = require('express');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

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
