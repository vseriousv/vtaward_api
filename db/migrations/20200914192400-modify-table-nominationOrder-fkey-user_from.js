'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table "nomination_order" add constraint "nomination_order_user_from_fkey" 
        foreign key ("user_from") references "users"(id);
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table nomination_order drop constraint "nomination_order_user_from_fkey";
    `)
  }
};
