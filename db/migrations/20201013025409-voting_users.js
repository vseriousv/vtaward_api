'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`

      CREATE TABLE "voting_users" (
        "id" serial,
        "user_id" integer NOT NULL,
        "nomination_order_id" integer NOT NULL,
        "create_at" date,
        "update_at" date,
        "range" integer NOT NULL
      );
        
 `);
},
        
        
down: (queryInterface, Sequelize) => {
  return queryInterface.sequelize.query(`
    DROP TABLE "voting_users";
  `)
  }
};