const sql = `   
  ALTER TABLE votes RENAME COLUMN type_voting TO type_vote;
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE votes RENAME COLUMN type_vote TO type_voting;
    `);
  }
};