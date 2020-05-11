const sql = `  
    alter table "participants" add constraint "participants_votingId_fkey" 
        foreign key ("voting_id") references "votings"(id);
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table participants drop constraint "participants_votingId_fkey";
    `);
  }
};
