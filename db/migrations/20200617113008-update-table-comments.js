const sql = `   
    ALTER TABLE comments ADD created_at timestamp with time zone;
    ALTER TABLE comments ADD updated_at timestamp with time zone; 
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE comments DROP column created_at;
      ALTER TABLE comments DROP column updated_at;
    `);
  }
};