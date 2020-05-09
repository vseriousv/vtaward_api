sql = `
    insert into public."positions"(
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