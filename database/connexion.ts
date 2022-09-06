import { Sequelize } from 'sequelize';

const database = new Sequelize('node', 'deluxer', 'deluxer123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

export default database;