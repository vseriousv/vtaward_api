const sql = `   
    ALTER TABLE "votes" ADD CONSTRAINT "votes_votingId_fkey" 
      FOREIGN KEY ("voting_id") REFERENCES "voting"(id);
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE votes DROP CONSTRAINT "votes_votingId_fkey";
    `);
  }
};