'use strict';



module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`       
      alter table feedback_form rename column name to "userId";      
      alter table feedback_form alter column "userId" type integer using "userId"::integer;
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table feedback_form rename column userId to "name";      
      alter table feedback_form alter column "name" type varchar(255) using "name"::varchar(255);   
    `)
  }
};
