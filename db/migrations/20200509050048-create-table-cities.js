const sql = `
     create table "cities" (
        "id" serial, 
        "state_id" integer NOT NULL,
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
