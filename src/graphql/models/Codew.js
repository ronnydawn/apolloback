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
}

class ModNav extends Model {
    static get tableName() {
      return "nuc_acc_navigation";
    }
  }

const RoleNav = ModRoleNav.bindKnex(codew);
const Nav = ModNav.bindKnex(codew);

// RoleNav.query().then(console.log);

module.exports = { ModRoleNav, RoleNav, Nav };
