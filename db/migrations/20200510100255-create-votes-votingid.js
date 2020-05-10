const sql = `   
    ALTER TABLE votes ADD voting_id int NOT NULL;
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE votes DROP column voting_id;
    `);
  }
};