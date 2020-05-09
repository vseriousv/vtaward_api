const sql = `
    
    do $$
    begin
        if not exists (
            select 
                t.typname enum_name
            from 
                pg_type t join 
                pg_enum e on t.oid = e.enumtypid join
                pg_catalog.pg_namespace n on n.oid = t.typnamespace 
            where  
                n.nspname = 'public' and 
                t.typname='enum_users_role' 
            group by 1
        ) then
            create type "public"."enum_users_role" as enum('admin', 'comittee', 'user');
        end if;
    end
    $$;

    create table "users" (
        "id" serial, 
        "email" varchar(255)  NOT NULL, 
        "password" varchar(255)  NOT NULL, 
        "tab_number" varchar(40) unique NOT NULL,
        "firstname_ru" varchar(40) NOT NULL,
        "firstname_en" varchar(40) NOT NULL,
        "lastname_ru" varchar(40) NOT NULL,
        "lastname_en" varchar(40) NOT NULL,
        "patronymic_ru" varchar(40),
        "patronymic_en" varchar(40),
        "position_id" varchar(40),
        "section_id" varchar(40),
        "state_id" varchar(40) NOT NULL,
        "city_id" varchar(40),
        "nomination_id"varchar(40),
        "count_z" integer NOT NULL default 0,
        "description_ru" varchar(40),
        "description_en" varchar(40),
        "role" "public"."enum_users_role" DEFAULT 'user',
        "created_at" timestamp with time zone, 
        "updated_at" timestamp with time zone, 
        "deleted_at" timestamp with time zone,
        primary key ("id")
    );  
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP TABLE "users";
      DROP type "public"."enum_users_role";
    `);
  }
};
