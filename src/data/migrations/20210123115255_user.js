exports.up = (knex) =>
  knex.schema.createTable("user", (table) => {
    table.bigIncrements("id").unsigned();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
  });

exports.down = (knex) => knex.schema.dropSchemaIfExists("user");
