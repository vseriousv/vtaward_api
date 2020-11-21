'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query(`
      ALTER TABLE nomination_order ADD step_3 boolean;

      alter table users alter column role type varchar(255);
			alter table users alter column role set default 'user';

			alter table user_voting alter column type type varchar(255);
			alter table user_voting alter column type set default 'users';
    `)
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query(`
      ALTER TABLE nomination_order DROP COLUMN step_3;
    `)
	}
};
