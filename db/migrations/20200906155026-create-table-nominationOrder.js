'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    
       create table "nomination_order_files" (
          "id" serial, 
          "file_path" varchar(255) NOT NULL,
          "nomination_order_id" integer NOT NULL,
          "created_at" timestamp with time zone, 
          "updated_at" timestamp with time zone, 
          primary key ("id")
      );   
           
      create table "nomination_order" (
          "id" serial, 
          "user_id" integer NOT NULL,
          "nomination_id" integer NOT NULL,
          "text_ru" text NOT NULL,
          "text_en" text NOT NULL,
          "created_at" timestamp with time zone, 
          "updated_at" timestamp with time zone, 
          primary key ("id")
      );
      
      alter table "nomination_order_files" add constraint "nomination_orderId_fkey" 
        foreign key ("nomination_order_id") references "nomination_order"(id);
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table nomination_order_files drop constraint "nomination_orderId_fkey";
      DROP TABLE "nomination_order";
      DROP TABLE "nomination_order_files";
    `)
  }
};
