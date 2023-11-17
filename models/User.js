const { DataTypes } = require('sequelize');
const sequelize = require('../utils/server');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userIdentifier: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userNickname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profilePhoto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize,
  timestamps: true,
});

module.exports = User;