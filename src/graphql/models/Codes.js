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

class ModNavigation extends Model {
  static get tableName() {
    return "nuc_acc_navigation";
  }

  static get relationMappings() {
    return {
      subnav: {
        relation: Model.HasManyRelation,
        modelClass: ModNavigation,
        join: {
          from: "nuc_acc_navigation.id",
          to: "nuc_acc_navigation.parentid",
        },
      },
    };
  }
}

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

// async function createSchema() {
//   if (await codes.schema.hasTable("persons")) {
//     return;
//   }

//   // Create database schema. You should use knex migration files
//   // to do this. We create it here for simplicity.
//   await codes.schema.createTable("persons", (table) => {
//     table.increments("id").primary();
//     table.integer("parentId").references("persons.id");
//     table.string("firstName");
//   });
// }

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

// createSchema()
//   .then(() => main())
//   .then(() => codes.destroy())
//   .catch((err) => {
//     console.error(err);
//     return codes.destroy();
//   });

class Menu extends Model {
  static get tableName() {
    return "nuc_menu";
  }
}

class ModPackage extends Model {
  static get tableName() {
    return "v_package";
  }

  
}

class ModProduct extends Model {
  static get tableName() {
    return "nuc_product";
  }

  static get relationMappings() {
    return {
      package: {
        relation: Model.HasManyRelation,
        modelClass: ModPackage,
        join: {
          from: "nuc_product.id",
          // through: {
          //   // mer_partner_order is the join table.
          //   from: 'mer_partner_order.productid',
          //   to: 'mer_partner_order.packageid'
          // },
          to: "v_package.productid",
        },
      },
    };
  }
}

class ModOrder extends Model {
  // static tableName = "nuc_partner";
  static get tableName() {
    return "mer_partner_order";
  }

  static get relationMappings() {
    return {
      product: {
        relation: Model.HasManyRelation,
        modelClass: ModProduct,
        join: {
          from: "mer_partner_order.productid",
          to: "nuc_product.id",
        },
      },
    };
  }
}

class ModPartner extends Model {
  static get tableName() {
    return "nuc_partner";
  }

  static get relationMappings() {
    return {
      order: {
        relation: Model.HasManyRelation,
        modelClass: ModOrder,
        join: {
          from: "nuc_partner.id",
          to: "mer_partner_order.partnerid",
        },
      },
    };
  }
}

class ModOrderPartner extends Model {
  // static tableName = "nuc_partner";
  static get tableName() {
    return "mer_partner_order";
  }

  static get relationMappings() {
    return {
      partner: {
        relation: Model.HasManyRelation,
        modelClass: ModPartner,
        join: {
          from: "mer_partner_order.partnerid",
          to: "nuc_partner.id",
        },
      },
      product: {
        relation: Model.HasManyRelation,
        modelClass: ModProduct,
        join: {
          from: "mer_partner_order.productid",
          to: "nuc_product.id",
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

class ModAcc1 extends Model {
  static get tableName() {
    return "mer_account";
  }
}

const ModPackage1 = async () => {
  return await codes
    .select("packageid", "name", "navigation")
    .from("v_package");
};

// const Person = ModPerson.bindKnex(codes);
// const Menu = ModMenu.bindKnex(codes);
// const Partner = ModPartner.bindKnex(codes);

const Product = ModProduct.bindKnex(codes);
const Partner = ModPartner.bindKnex(codes);
const OrderPartner = ModOrderPartner.bindKnex(codes);
const Package = ModPackage.bindKnex(codes);
const Acc1 = ModAcc1.bindKnex(codes);
const Navigation = ModNavigation.bindKnex(codes);

// ModPackage1().then(console.log);
// console.log(ModPackage1);

module.exports = {
  Navigation,
  Acc1,
  ModPackage,
  ModPackage1,
  Package,
  Person,
  Menu,
  Product,
  Partner,
  OrderPartner,
  Level,
};
