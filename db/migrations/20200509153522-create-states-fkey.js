const sql = `   
    ALTER TABLE "users" ADD CONSTRAINT "users_stateId_fkey" 
      FOREIGN KEY ("state_id") REFERENCES "states"(id);
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
        ALTER TABLE users DROP CONSTRAINT "users_stateId_fkey";
    `);
  }
};