const sql = `

    insert into public."users"(
        "email",
        "password",
        "tab_number",
        "firstname_ru",
        "firstname_en",
        "lastname_ru",
        "lastname_en",
        "patronymic_ru",
        "patronymic_en",
        "position_id",
        "section_id",
        "state_id",
        "city_id",
        "count_z",
        "role",
        "img",
        "created_at",
        "updated_at",
        "deleted_at"
    ) values (
        'test@test.com', 
        '$2b$10$t1XU3KNTPakVWMYqiS./7OJOKRSV9laxqJlQNy1qNjhesxJD6e422', 
        '123',
        'Вова',
        'Vova', 
        'Михайлов'  
        'Mikhaylov', 
        'Отчество',
        'Patronymic',
        'a',
        'b',
        'c',
        'd',
        'nsk',
        '0',
        'user',
        '/asdasd/asdads/asdasd.jpg',
        'now()',
        'now()',
        null
    );
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: () => {},
};