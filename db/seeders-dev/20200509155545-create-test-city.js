sql = `
    insert into public."cities"(
        "value_ru",
        "value_en"
    ) values (
        'string', 
        'string'
    );
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: () => {},
};