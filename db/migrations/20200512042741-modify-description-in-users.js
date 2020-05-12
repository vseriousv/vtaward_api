const sql = `  
    alter table users alter column description_ru type text using description_ru::text;
    alter table users alter column description_en type text using description_en::text;
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      alter table users alter column description_ru type varchar(40) using description_ru::varchar(40);
      alter table users alter column description_en type varchar(40) using description_en::varchar(40);
    `);
  }
};
