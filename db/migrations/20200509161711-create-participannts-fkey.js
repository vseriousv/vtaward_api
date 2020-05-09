const sql = `   
    ALTER TABLE "participants" ADD CONSTRAINT "participants_userId_fkey" 
      FOREIGN KEY ("user_id") REFERENCES "users"(id);
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE users DROP CONSTRAINT "participants_userId_fkey";
    `);
  }
};