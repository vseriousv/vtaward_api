'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table "nomination_order" add constraint "nomination_order_userId_fkey" 
        foreign key ("user_id") references "users"(id);
        
      alter table "nomination_order" add constraint "nomination_order_nominationId_fkey" 
        foreign key ("nomination_id") references "nominations"(id);
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table nomination_order drop constraint "nomination_order_userId_fkey";
      alter table nomination_order drop constraint "nomination_order_nominationId_fkey";
    `)
  }
};
