'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query(`
    create table "archive_winners" (
      "id" serial, 
      "img" varchar(255) NOT NULL, 
      "year" integer NOT NULL, 
      "position" varchar(255) NOT NULL,
      "city" varchar(255) NOT NULL,
      primary key ("id")
  );
    `);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query(`
      DROP TABLE "archive_winners";
    `);
	},
};
