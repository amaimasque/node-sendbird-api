const Sequelize = require("sequelize");

const POSTGRESQL_USERNAME = process.env.POSTGRESQL_USERNAME ?? ''
const POSTGRESQL_PASSWORD = process.env.POSTGRESQL_PASSWORD ?? ''
const POSTGRESQL_DATABASE_NAME = process.env.POSTGRESQL_DATABASE_NAME ?? ''
const POSTGRESQL_HOST_NAME = process.env.POSTGRESQL_HOST_NAME ?? ''

const sequelize = new Sequelize(
  POSTGRESQL_DATABASE_NAME,
  POSTGRESQL_USERNAME,
  POSTGRESQL_PASSWORD,
  {
    host: POSTGRESQL_HOST_NAME,
    dialect: 'postgres',
    force: false,
    logging: (...msg) => console.log(msg)
  }
);

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