const Sequelize = require('sequelize');


const connection = new Sequelize('api_games', 'root', '0000', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
    timezone: '-03:00'
});


module.exports = connection 