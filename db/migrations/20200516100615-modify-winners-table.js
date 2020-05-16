const sql = `
    alter table winners drop column type_voting;
    alter table winners drop column year_voting;
    alter table winners add voting_id int;
    alter table "winners" add constraint "winners_votingId_fkey" 
        foreign key ("voting_id") references "votings"(id);
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table winners add type_voting varchar(40);
      alter table winners add year_voting int;
      alter table winners drop column voting_id;
      alter table winners drop constraint "winners_votingId_fkey";
    `);
  }
};
