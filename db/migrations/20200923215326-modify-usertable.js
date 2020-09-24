'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`       
      alter table users add position_name varchar(255);      
      alter table users add city_name varchar(255);  
      alter table users add section_name varchar(255);      
      alter table users add password_text varchar(255);        
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table users drop column position_name;      
      alter table users drop column city_name;  
      alter table users drop column section_name;      
      alter table users drop column password_text;       
    `)
  }
};

