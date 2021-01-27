const Knex = require("knex");
const { Model } = require("objection");

const codew = Knex({
  client: "mysql",
  connection: {
    database: "localhost",
    user: "root",
    password: "",
    database: "code_w",
  },
});

Model.knex(codew);

class ModRoleNav extends Model {
  static get tableName() {
    return "mer_acc_rolenav";
  }

  // static get relationMappings() {
  //   return {
  //     subnav: {
  //       relation: Model.HasManyRelation,
  //       modelClass: ModNav,
  //       join: {
  //         from: "nuc_acc_navigation.id",
  //         to: "nuc_acc_navigation.parentid",
  //       },
  //     },
  //   };
  // }

}

class ModNav extends Model {
    static get tableName() {
      return "nuc_acc_navigation";
    }

    static get relationMappings() {
      return {
        subnav: {
          relation: Model.HasManyRelation,
          modelClass: ModNav,
          join: {
            from: "nuc_acc_navigation.id",
            to: "nuc_acc_navigation.parentid",
          },
        },
      };
    }
  }

const RoleNav = ModRoleNav.bindKnex(codew);
const Nav = ModNav.bindKnex(codew);

// RoleNav.query().then(console.log);

module.exports = { ModRoleNav, ModNav, RoleNav, Nav };
