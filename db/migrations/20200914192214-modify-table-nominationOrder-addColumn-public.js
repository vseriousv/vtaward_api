'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE nomination_order ADD public boolean;
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE nomination_order DROP COLUMN public;
    `)
  }
};
