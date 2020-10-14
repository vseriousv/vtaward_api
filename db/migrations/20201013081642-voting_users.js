'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`

      ALTER TABLE "voting_users" add constraint "voting_users_user_id_from_fkey" FOREIGN KEY ("user_id") REFERENCES "users"(id); 
      ALTER TABLE "voting_users" add constraint "voting_users_nomination_orders_from_fkey" FOREIGN KEY ("nomination_order_id") REFERENCES "nomination_order"(id);
  `);
},
        
        
down: (queryInterface, Sequelize) => {
  return queryInterface.sequelize.query(`
    ALTER TABLE "voting_users" drop constraint "voting_users_from_fkey" FOREIGN KEY ("user_id") REFERENCES "users"(id); 
    ALTER TABLE "voting_users" drop constraint "vting_users_from_fkey" FOREIGN KEY ("nomination_order_id") REFERENCES "nomination_order"(id);
  `)
  }
};