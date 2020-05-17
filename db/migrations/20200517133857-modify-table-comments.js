const sql = `   
    ALTER TABLE comments ADD comment varchar(255) NOT NULL;
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE comments DROP column comment;
    `);
  }
};