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
      subnav1: {
        relation: Model.HasManyRelation,
        modelClass: ModNavigation,
        join: {
          from: "nuc_acc_navigation.id",
          to: "nuc_acc_navigation.parentid",
        },
      },
      subnav: {
        relation: Model.ManyToManyRelation,
        modelClass: ModLevel,
        join: {
          from: "nuc_acc_navigation.id",
          through: {
            from: "v_accrolenav.navid",
            to: "v_accrolenav.levelid",
          },
          to: "nuc_acc_level.id",
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

  static get modifiers() {
    return {
      filterPackage(query, packageid) {
        query.where("packageid", packageid);
      },
    };
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
        // filter: query => query.select('v_package.packageid'),
        join: {
          from: "nuc_product.id",
          // through: {
          //   // mer_partner_order is the join table.
          //   from: "mer_partner_order.productid",
          //   to: "mer_partner_order.productid",
          // },
          to: "v_package.productid",
        },
      },

      // order_package: {
      //   relation: Model.HasOneThroughRelation,
      //   modelClass: ModPackage,
      //   join: {
      //     from: "nuc_product.id",
      //     through: {
      //       // mer_partner_order is the join table.
      //       from: "mer_partner_order.productid",
      //       to: "mer_partner_order.packageid",
      //     },
      //     to: "v_package.packageid",
      //   },
      // },
    };
  }

  // static get modifiers() {
  //   return {
  //     filterPackage(query, packageid) {
  //       query.where("packageid", packageid);
  //     },
  //   };
  // }
}

// class ModOrder extends Model {
//   // static tableName = "nuc_partner";
//   static get tableName() {
//     return "mer_partner_order";
//   }

//   static get relationMappings() {
//     return {
//       product: {
//         relation: Model.HasManyRelation,
//         modelClass: ModProduct,
//         join: {
//           from: "mer_partner_order.productid",
//           to: "nuc_product.id",
//         },
//       },
//     };
//   }
// }

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
          // through: {
          //   from: "mer_partner_order.partnerid",
          //   to: "mer_partner_order.partnerid",
          // },
          to: "mer_partner_order.partnerid",
        },
      },
      level: {
        relation: Model.HasManyRelation,
        modelClass: ModRole,
        join: {
          from: "nuc_partner.id",
          // through: {
          //   from: "v_accrolenav.partnerid",
          //   to: "v_accrolenav.levelid",
          // },
          to: "v_accrolenav.partnerid",
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
      partner: {
        relation: Model.HasManyRelation,
        modelClass: ModPartner,
        join: {
          from: "mer_partner_order.partnerid",
          // through: {
          //   // persons_movies is the join table.
          //   from: "mer_partner_order.productid",
          //   to: "mer_partner_order.partnerid",
          // },
          to: "nuc_partner.id",
        },
      },
      product: {
        relation: Model.HasManyRelation,
        modelClass: ModProduct,
        join: {
          from: "mer_partner_order.productid",
          // through: {
          //   // persons_movies is the join table.
          //   from: "mer_partner_order.productid",
          //   to: "mer_partner_order.productid",
          // },
          to: "nuc_product.id",
        },
      },
      package: {
        relation: Model.HasManyRelation,
        modelClass: ModPackage,
        join: {
          from: "mer_partner_order.packageid",
          // through: {
          //   // persons_movies is the join table.
          //   from: "mer_partner_order.productid",
          //   to: "mer_partner_order.partnerid",
          // },
          to: "v_package.packageid",
        },
      },
      orderProduct: {
        relation: Model.ManyToManyRelation,
        modelClass: ModPackage,
        join: {
          from: "mer_partner_order.productid",
          through: {
            // persons_movies is the join table.
            from: "mer_partner_order.productid",
            to: "mer_partner_order.packageid",
          },
          to: "v_package.packageid",
        },
      },
    };
  }
}

class ModLevel extends Model {
  // static tableName = "nuc_partner";
  static get tableName() {
    return "nuc_acc_level";
  }

  static get relationMappings() {
    return {
      nav: {
        relation: Model.ManyToManyRelation,
        modelClass: ModNavigation,
        join: {
          from: "nuc_acc_level.id",
          through: {
            from: "v_accrolenav.levelid",
            to: "v_accrolenav.navid",
          },
          to: "nuc_acc_navigation.id",
        },
      },
    };
  }
}

class ModPartnerLevel extends Model {
  static get tableName() {
    return "mer_partner_level";
  }
}

class ModAcc1 extends Model {
  static get tableName() {
    return "mer_account";
  }
}

class ModRole extends Model {
  static get tableName() {
    return "v_accrolenav";
  }

  static get relationMappings() {
    return {
      partner: {
        relation: Model.HasManyRelation,
        modelClass: ModPartner,
        join: {
          from: "v_accrolenav.partnerid",
          to: "nuc_partner.id",
        },
      },
      nav: {
        relation: Model.HasManyRelation,
        modelClass: ModNav,
        join: {
          from: "v_accrolenav.navid",
          to: "nuc_acc_navigation.id",
        },
      },
    };
  }
}

class ModNav extends Model {
  static get tableName() {
    return "nuc_acc_navigation";
  }
}

const ModPackage1 = async () => {
  return await codes
    .select("packageid", "name", "navigation")
    .from("v_package");
};

const Product = ModProduct.bindKnex(codes);
const Partner = ModPartner.bindKnex(codes);
const Order = ModOrder.bindKnex(codes);
const Package = ModPackage.bindKnex(codes);
const Acc1 = ModAcc1.bindKnex(codes);
const Navigation = ModNavigation.bindKnex(codes);
const Role = ModRole.bindKnex(codes);
const Level = ModLevel.bindKnex(codes);

// ModPackage1().then(console.log);
// console.log(ModPackage1);

module.exports = {
  Role,
  Navigation,
  Acc1,
  ModPackage,
  ModPackage1,
  Package,
  Person,
  Menu,
  Product,
  Partner,
  Order,
  Level,
};
