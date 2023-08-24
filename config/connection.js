require('dotenv').config();
const Sequelize = require('sequelize');

const createDatabaseConnection = () => {
  const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DATABASE_URL,
        dialect: 'mysql',
        dialectOptions: {
          decimalNumbers: true,
        },
      });

  return sequelize;
};

const testDatabaseConnection = (sequelize) => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Database connection has been established successfully.');
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
    });
};

const sequelize = createDatabaseConnection();
testDatabaseConnection(sequelize);

module.exports = sequelize;

