const sql = `
INSERT INTO users (
       email,
       password,
       tab_number,
       firstname_ru,
       firstname_en,
       lastname_ru,
       lastname_en,
       patronymic_ru,
       patronymic_en,
       position_id,
       section_id,
       state_id,
       city_id,
       nomination_id,
       count_z,
       description_ru,
       description_en,
       role,
       created_at,
       updated_at,
       deleted_at
) VALUES (
    'test@test.com',
    '$2b$10$t1XU3KNTPakVWMYqiS./7OJOKRSV9laxqJlQNy1qNjhesxJD6e422',
    '123',
     'Админ',
     'Admin',
     'Админов',
     'Adminov',
     'Админович',
     'Adminovich',
     null,
     null,
     2,
     null,
     null,
     0,
     null,
     null,
     'admin',
     now(),
     now(),
     null
);
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: () => {},
};


