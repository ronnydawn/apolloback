const Knex = require("knex");
const { Model } = require("objection");

const codes = Knex({
  client: "mysql",
  connection: {
    database: "localhost",
    user: "root",
    password: "",
    database: "codes",
  },
});

Model.knex(codes);

class Account extends Model {
  static get tableName() {
    return "mer_account";
  }

  static get relationMappings() {
    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: Account,
        join: {
          from: "account.id",
          to: "account.parentId",
        },
      },
    };
  }
}

async function createSchema() {
  if (await codes.schema.hasTable("mer_account")) {
    return;
  }

  // Create database schema. You should use knex migration files
  // to do this. We create it here for simplicity.
  await codes.schema.createTable("mer_account", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("email");
  });
}

class Menu extends Model {
  static get tableName() {
    return "nuc_menu";
  }
}

const getLevel = async () => {
  return await codes.select("id", "name").from("nuc_acc_level");
};

// const GetLevel = await codes.select("id", "name").from("nuc_acc_level");

const GetAccount = Account.bindKnex(codes);
const GetMenu = Menu.bindKnex(codes);

module.exports = { GetAccount, GetMenu, getLevel };
