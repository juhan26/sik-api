import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sid_api', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
