"use strict";

module.exports = {
  up: async  (queryInterface, Sequelize) => {
   await queryInterface.changeColumn("users", "password", {
      type:  Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users", "password", {
      type:  Sequelize.STRING(12),
      allowNull: false,
    });
  },
};
