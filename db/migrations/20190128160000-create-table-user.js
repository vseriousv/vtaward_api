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
                t.typname='enum_user_role' 
            group by 1
        ) then
            create type "public"."enum_user_role" as enum('admin', 'comittee', 'user');
        end if;
    end
    $$;

    create table "users" (
        "id" serial, 
        "email" varchar(255) unique NOT NULL, 
        "password" varchar(255) NOT NULL, 
        "tab_number" integer,
        "name_ru" varchar(40) NOT NULL,
        "name_en" varchar(40) NOT NULL,
        "position_id" integer NOT NULL,
        "section_id" integer NOT NULL,
        "state_id" integer NOT NULL,
        "city_id" integer NOT NULL,
        "nomination_id" integer,
        "count_z" integer NOT NULL default 0,
        "description_ru" varchar(40),
        "description_en" varchar(40),
        "role" "public"."enum_user_role" DEFAULT 'user',
        "created_at" timestamp with time zone, 
        "updated_at" timestamp with time zone, 
        "deleted_at" timestamp with time zone,
        primary key ("id")
    );
    
     create table "sections" (
        "id" serial, 
        "value_ru" varchar(255) NOT NULL, 
        "value_en" varchar(255) NOT NULL,
        primary key ("id")
    );
    
     create table "positions" (
        "id" serial, 
        "value_ru" varchar(255) NOT NULL, 
        "value_en" varchar(255) NOT NULL,
        primary key ("id")
    );
    
     create table "states" (
        "id" serial, 
        "value_ru" varchar(255) NOT NULL, 
        "value_en" varchar(255) NOT NULL,
        primary key ("id")
    );
    
     create table "cities" (
        "id" serial, 
        "state_id" integer NOT NULL,
        "value_ru" varchar(255) NOT NULL, 
        "value_en" varchar(255) NOT NULL,
        primary key ("id")
    );
    
     create table "nominations" (
        "id" serial, 
        "value_ru" varchar(255) NOT NULL, 
        "value_en" varchar(255) NOT NULL,
        primary key ("id")
    );
    
     create table "participants" (
        "id" serial, 
        "user_id" integer NOT NULL, 
        "year_voting" integer NOT NULL, 
        "type_voting" varchar(40) NOT NULL,
        primary key ("id")
    );
    
     create table "votes" (
        "id" serial, 
        "user_from_id" integer NOT NULL, 
        "user_to_id" integer NOT NULL,
        "type_vote" varchar(40) NOT NULL,
        "count_vote" varchar(40) NOT NULL
        primary key ("id")
    );
    
     create table "winners" (
        "id" serial, 
        "user_id" integer NOT NULL, 
        "year_voting" integer NOT NULL, 
        "type_voting" varchar(40) NOT NULL,
        primary key ("id")
    );
    
`;

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(sql),
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP TABLE "user";
      DROP TABLE "sections";
      DROP TABLE "positions";
      DROP TABLE "states";
      DROP TABLE "cities";
      DROP TABLE "nominations";
      DROP TABLE "participants";
      DROP TABLE "votes";
      DROP TABLE "winners";
      DROP type "public"."enum_user_gender";
      DROP type "public"."enum_user_role";
    `);
  }
};
