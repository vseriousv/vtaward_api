'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE user_voting ADD "created_at" timestamp with time zone;
      ALTER TABLE user_voting ADD "updated_at" timestamp with time zone;
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE user_voting DROP COLUMN created_at;
      ALTER TABLE user_voting DROP COLUMN updated_at;
    `);
  },
};

