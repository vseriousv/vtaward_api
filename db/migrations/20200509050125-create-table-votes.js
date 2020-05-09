const sql = `
     create table "votes" (
        "id" serial, 
        "user_from_id" integer NOT NULL,
        "user_to_id" integer NOT NULL,
        "type_voting" varchar(40) NOT NULL,
        "count_vote" integer NOT NULL,
        primary key ("id")
    );
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP TABLE "votes";
    `);
  }
};
