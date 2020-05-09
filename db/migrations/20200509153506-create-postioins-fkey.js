const sql = `   
    ALTER TABLE "users" ADD CONSTRAINT "users_positionId_fkey" 
      FOREIGN KEY ("position_id") REFERENCES "positions"(id);
      
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE users DROP CONSTRAINT "users_positionId_fkey";
    `);
  }
};

