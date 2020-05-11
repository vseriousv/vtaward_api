const sql = `   
    ALTER TABLE "votes" ADD CONSTRAINT "votes_userFrom_fkey" 
      FOREIGN KEY ("user_from_id") REFERENCES "users"(id);
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE votes DROP CONSTRAINT "votes_userFrom_fkey";
    `);
  }
};