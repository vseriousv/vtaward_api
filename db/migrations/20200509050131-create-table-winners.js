const sql = ` 
     create table "winners" (
        "id" serial, 
        "user_id" integer NOT NULL, 
        "year_voting" integer NOT NULL, 
        "type_voting" varchar(40) NOT NULL,
        primary key ("id")
    );    
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP TABLE "winners";
    `);
  }
};
