const sql = `
     create table "feedback_form" (
        "id" serial, 
        "name" varchar(255) NOT NULL,
        "text" text NOT NULL,
        "is_active" boolean DEFAULT false,
        primary key ("id")
    );
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
     DROP TABLE "feedback_form";
    `);
  }
};