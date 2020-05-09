const sql = `   
    ALTER TABLE "users" ADD CONSTRAINT "users_cityId_fkey" 
      FOREIGN KEY ("city_id") REFERENCES "cities"(id); 
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
        ALTER TABLE users DROP CONSTRAINT "users_cityId_fkey";
    `);
  }
};