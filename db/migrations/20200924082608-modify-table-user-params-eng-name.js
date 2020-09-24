'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`       
      alter table users add position_name_eng varchar(255);      
      alter table users add city_name_eng varchar(255);  
      alter table users add section_name_eng varchar(255);      
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table users drop column position_name_eng;      
      alter table users drop column city_name_eng;  
      alter table users drop column section_name_eng;     
    `)
  }
};