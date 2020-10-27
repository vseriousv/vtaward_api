'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table comments alter column comment type text using comment::text;
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table comments alter column comment type varchar(255) using comment::varchar(255);
    `);
  },
};

