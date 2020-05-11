const sql = `   
    alter table voting rename to votings;
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table votins rename to voting;
    `);
  }
};
