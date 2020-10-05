'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table comments add nomination_order_id int not null;    
      alter table comments add constraint comments_nomination_order_id_fk foreign key (nomination_order_id) references nomination_order;
        
      alter table comments drop constraint "comments_userFrom_fkey";      
      alter table comments drop column user_from_id; 
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table comments drop column nomination_order_id;      
      alter table comments drop constraint "comments_nomination_order_id_fk";
      
      alter table comments add constraint comments_userFrom_fkey foreign key (user_from_id) references nomination_order;      
      alter table comments add user_from_id int not null; 
    `)
  }
};

