const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
    // define post model
const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
    // associate the post with the user  
  Post.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  module.exports = Post;
