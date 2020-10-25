'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      CREATE TYPE enum_user_voting_type AS ENUM ('users', 'сommission');
      
      CREATE TABLE "user_voting" (
        "id" serial,
        "user_from_id" int NOT NULL,
        "nomination_order_id" int NOT NULL,
        "range" int NOT NULL,
        "type" enum_user_voting_type NOT NULL DEFAULT 'users'::enum_user_voting_type, 
        primary key ("id")
      );
      
      ALTER TABLE "user_voting" ADD CONSTRAINT "messages_user_from_id_users_fkey" 
      FOREIGN KEY ("user_from_id") REFERENCES "users"(id);
      
      ALTER TABLE "user_voting" ADD CONSTRAINT "messages_nomination_order_id_nomination_order_fkey" 
      FOREIGN KEY ("nomination_order_id") REFERENCES "nomination_order"(id);
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP TABLE "user_voting";
      DROP TYPE enum_user_voting_type;
    `);
  },
};

