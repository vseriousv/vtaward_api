const sql = `
     create table "cities" (
        "id" serial, 
        "value_ru" varchar(255) NOT NULL, 
        "value_en" varchar(255) NOT NULL,
        primary key ("id")
    );    
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP TABLE "cities";
    `);
  }
};
