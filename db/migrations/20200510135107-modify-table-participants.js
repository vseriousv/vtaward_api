const sql = `  
    alter table participants drop column year_voting;
    alter table participants drop column type_voting;
    alter table participants add column voting_id int not null;
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table participants add column year_voting int;
      alter table participants add column type_voting varchar(40);
      alter table participants drop column voting_id;
    `);
  }
};
