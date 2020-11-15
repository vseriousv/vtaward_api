'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE nomination_order ADD step_2 boolean;
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE nomination_order DROP COLUMN step_2;
    `)
  }
};