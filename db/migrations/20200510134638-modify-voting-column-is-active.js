const sql = `   
    alter table votings alter column type_voting set default false;
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table votings alter column type_voting;
    `);
  }
};
