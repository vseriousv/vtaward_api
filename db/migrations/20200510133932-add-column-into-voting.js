const sql = `   
    alter table votings add is_active boolean;
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table votings drop column is_active;
    `);
  }
};
