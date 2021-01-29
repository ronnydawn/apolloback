const Knex = require("knex");
const { Model } = require("objection");

const { ModRoleNav, RoleNav } = require("./Codew");

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

class Person extends Model {
  static get tableName() {
    return "persons";
  }

  static get relationMappings() {
    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: Person,
        join: {
          from: "persons.id",
          to: "persons.parentId",
        },
      },
    };
  }
}

async function createSchema() {
  if (await codes.schema.hasTable("persons")) {
    return;
  }

  // Create database schema. You should use knex migration files
  // to do this. We create it here for simplicity.
  await codes.schema.createTable("persons", (table) => {
    table.increments("id").primary();
    table.integer("parentId").references("persons.id");
    table.string("firstName");
  });
}

async function main() {
  // Create some people.
  // const sylvester = await Person.query().insertGraph({
  //   firstName: 'Sylvester',

  //   children: [
  //     {
  //       firstName: 'Sage'
  //     },
  //     {
  //       firstName: 'Sophia'
  //     }
  //   ]
  // });

  // console.log('created:', sylvester);

  // Fetch all people named Sylvester and sort them by id.
  // Load `children` relation eagerly.
  const sylvesters = await Person.query()
    .where("firstName", "Sylvester")
    .withGraphFetched("children")
    .orderBy("id");

  // console.log('sylvesters:', sylvesters);
}

createSchema()
  .then(() => main())
  .then(() => codes.destroy())
  .catch((err) => {
    console.error(err);
    return codes.destroy();
  });

class Menu extends Model {
  static get tableName() {
    return "nuc_menu";
  }
}

class Partner extends Model {
  // static tableName = "nuc_partner";
  static get tableName() {
    return "v_partRolenav";
  }

  // static relationMappings = {
  //   rolenav: {
  //     relation: Model.HasManyRelation,
  //     modelClass: RoleNav,
  //     join: {
  //       from: "persons.id",
  //       to: "mer_acc_rolenav.partnerid",
  //     },
  //   },
  // };
  static get relationMappings() {
    return {
      rolenav: {
        relation: Model.HasManyRelation,
        modelClass: Partner,
        join: {
          from: "v_partRolenav.partnerid",
          to: "v_partRolenav.parentid",
        },
      },
    };
  }
}

class Level extends Model {
  // static tableName = "nuc_partner";
  static get tableName() {
    return "v_levelNav";
  }

  // static relationMappings = {
  //   rolenav: {
  //     relation: Model.HasManyRelation,
  //     modelClass: RoleNav,
  //     join: {
  //       from: "persons.id",
  //       to: "mer_acc_rolenav.partnerid",
  //     },
  //   },
  // };
  static get relationMappings() {
    return {
      navigation: {
        relation: Model.HasManyRelation,
        modelClass: Level,
        join: {
          from: "v_levelNav.levelid",
          to: "v_levelNav.parentid",
        },
      },
    };
  }
}

// const GetLevel = await codes.select("id", "name").from("nuc_acc_level");

// const Person = ModPerson.bindKnex(codes);
// const Menu = ModMenu.bindKnex(codes);
// const Partner = ModPartner.bindKnex(codes);

// RoleNav.query().then(console.log);
// console.log(ModPerson);

module.exports = { Person, Menu, Partner, Level };
