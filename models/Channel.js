const { DataTypes } = require('sequelize');
const sequelize = require('../utils/server');

const Channel = sequelize.define('Channel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  channelUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creatorId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chatMateId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN
  },
  numMessages: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize,
  timestamps: true,
});

module.exports = Channel;