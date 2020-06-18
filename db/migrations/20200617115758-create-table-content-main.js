const sql = `
    create table "content_main" (
        "id" serial, 
        "name_ru" varchar(255) NOT NULL,
        "name_en" varchar(255) NOT NULL,
        "position_ru" varchar(255) NOT NULL,
        "position_en" varchar(255) NOT NULL,
        "text_ru" text NOT NULL,
        "text_en" text NOT NULL,
        "image" varchar(255) NOT NULL,
        "created_at" timestamp with time zone, 
        "updated_at" timestamp with time zone, 
        primary key ("id")
    );   
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP TABLE "content_main";
    `);
  }
};
