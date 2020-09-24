'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`       
      alter table users drop constraint "users_cityId_fkey";     
      alter table users drop constraint "users_nominationId_fkey";     
      alter table users drop constraint "users_positionId_fkey";     
      alter table users drop constraint "users_sectionId_fkey";     
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    alter table "users" add constraint "users_cityId_fkey" 
      foreign key ("city_id") references "cities"(id);
      
    alter table "users" add constraint "users_nominationId_fkey" 
      foreign key ("nomination_id") references "nominations"(id);
      
    alter table "users" add constraint "users_positionId_fkey" 
      foreign key ("position_id") references "positions"(id);
      
    alter table "users" add constraint "users_sectionId_fkey" 
      foreign key ("section_id") references "sections"(id);
    `)
  }
};

