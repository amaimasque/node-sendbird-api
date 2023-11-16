const Sequelize = require("sequelize");

const sequelize = new Sequelize('postgres://postgres:P%40ssword123@localhost:5432/sendbird');

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

sequelize.sync({ force: true }).then(() => {
  console.log('All models were synchronized successfully.');
}).catch((error) => {
  console.error('Unable to synchronize models: ', error);
});

module.exports = sequelize