const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");

//Instanciando o sequelize  passando a configuração com MySql
const connection = new Sequelize(dbConfig);

User.init(connection);

module.exports = connection;
