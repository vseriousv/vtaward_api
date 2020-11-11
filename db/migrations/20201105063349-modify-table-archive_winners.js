'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query(`
    alter table archive_winners add name varchar(255) not null;
    `);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query(`
    alter table archive_winners drop column name;
    `);
	},
};

