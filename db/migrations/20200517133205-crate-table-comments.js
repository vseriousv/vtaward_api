const sql = `
     create table "comments" (
        "id" serial, 
        "user_from_id" integer NOT NULL,
        "user_to_id" integer NOT NULL,
        primary key ("id")
    );
    ALTER TABLE "comments" ADD CONSTRAINT "comments_userFrom_fkey" 
      FOREIGN KEY ("user_from_id") REFERENCES "users"(id);
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
     ALTER TABLE comments DROP CONSTRAINT "comments_userFrom_fkey";
     DROP TABLE "votes";
    `);
  }
};