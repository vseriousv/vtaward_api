'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query(`
			ALTER TYPE enum_user_voting_type ADD VALUE 'final';
    `)
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query(`
    `)
	}
};
