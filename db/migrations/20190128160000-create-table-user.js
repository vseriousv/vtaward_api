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
        "position_id" integer,
        "section_id" integer,
        "state_id" integer NOT NULL,
        "city_id" integer,
        "nomination_id" integer,
        "count_z" integer NOT NULL default 0,
        "description_ru" varchar(40),
        "description_en" varchar(40),
        "role" "public"."enum_users_role" DEFAULT 'user',
        "img" varchar(255),
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
