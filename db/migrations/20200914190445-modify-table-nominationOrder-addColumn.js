'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE nomination_order ADD user_from int;
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE nomination_order DROP COLUMN user_from;
    `)
  }
};
