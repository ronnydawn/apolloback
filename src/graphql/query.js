const { raw } = require("objection");

const {
  Role,
  Product,
  Navigation,
  Acc1,
  ModPackage,
  ModPackage1,
  Package,
  Person,
  Partner,
  Order,
  Level,
} = require("./models/Codes");
const { RoleNav, Nav, ModNav, Acc } = require("./models/Codew");

// const navigation = async () => {
//   const sql = await Navigation.query()
//     .select("id", "content")
//     // .where("partnerid", "=", 1)
//     .withGraphFetched("subnav.[subnav]")
//     .orderBy("id");
//   return sql;
// };

const partnerRole = async () => {
  const sql = await Partner.query()
    .modifiers({
      selectFields: (query) =>
        query.select("nuc_acc_level.id", "nuc_acc_level.name"),
      joinLevel: (query) =>
        query.join("nuc_acc_level", "v_accrolenav.levelid", "nuc_acc_level.id"),
      groupBy: (query) => query.groupBy("nuc_acc_level.id"),
    })
    .withGraphFetched("level(selectFields,joinLevel,groupBy).[nav]")
    // .withGraphFetched("level")
    .where("nuc_partner.active", "=", 1);
  return sql;
};
// partnerRole().then(console.log);

const product = async () => {
  const sql = await Product.query()
    .select("nuc_product.id", "nuc_product.name")
    .withGraphJoined("package")
    // .modifiers({
    //   orderPackage(query) {
    //     query.orderBy("id", "ASC");
    //   },
    // })
    // .modifyGraph("package", (query) => {
    //   query.orderBy("packageid", "asc");
    // })
    // .where("package.packageid", "asc")
    .orderBy("nuc_product.id", "asc")
    .orderBy("package.id", "asc");
  return sql;
};

const listLevel = async () => {
  const sql = await Level.query()
    .where("nuc_acc_level.partnerid", "=", 2)
    .withGraphFetched("nav(selectFields)")
    .modifiers({
      selectFields: (query) =>
        query.select(
          "nuc_acc_navigation.id as id",
          "nuc_acc_navigation.content as content"
        ),
      joinLevel: (query) =>
        query.join("nuc_acc_navigation as b", "v_accrolenav.navid", "b.id"),
      // groupBy: (query) => query.groupBy("nuc_acc_level.id"),
    })
    // .debug()
    .then((tags) => {
      // console.log(tags);
      return tags;
    })
    .catch((error) => {
      // console.log(error);
      // res.send("An error occured");
    });

  const sql1 = await Level.query()
    .select("nuc_acc_level.*", "mer_partner_level.partnerid")
    .rightJoin(
      "mer_partner_level",
      "mer_partner_level.levelid",
      "nuc_acc_level.id"
    )
    .withGraphJoined("nav(fieldsNav).[subnav]")
    .modifiers({
      fieldsNav: (query) =>
        query
          .join("v_accrolenav", "v_accrolenav.navid", "nuc_acc_navigation.id")
          .where("nuc_acc_navigation.parentid", 0),
      // .where("v_accrolenav.levelid", 1),
      // .whereNotIn("nuc_acc_navigation.id", package_nav),
      // order: (query) => query.orderBy(["nuc_acc_navigation.id"]),
      fieldsSubav: (query) =>
        query.innerJoin("v_accrolenav", "v_accrolenav.levelid", "nav"),
    })
    .where("mer_partner_level.partnerid", 1)
    .where("nav.id", 5)
    .orderBy("nav.id");
  // .where("mer_partner_level.partnerid", 1);
  // .debug();
  return sql1;
};

const package = async () => {
  const sql = await Package.query()
    .select("packageid", "name", "navigation")
    .where("productid", "=", 1)
    .orderBy("packageid", "ASC");
  return sql;
};

const orderPartner = async () => {
  const sql = await Order.query()
    .select("mer_partner_order.id", "order_number")
    // .where("mer_partner_order.partnerid", "=", 1)
    // .withGraphFetched("partner(orderById)")
    // .modifiers({
    //   orderById(query) {
    //     query.orderBy("id");
    //   },
    // });
    .withGraphJoined("partner")
    .withGraphJoined("product.[package]");
  // .withGraphFetched("package")
  // .modifyGraph("product.package", (query) => {
  //   query.where("packageid", "mer_partner_order.packageid");
  // });
  // .withGraphFetched("product.[package]")
  // .withGraphJoined("package")
  // .modifyGraph("package", (query) => {
  //   query.where("packageid", "=", 1);
  // })
  // .where("package.productid", "product.id")
  // .orderBy("partner.id");
  return sql;
};

// const orderPartner = async () => {
//   const sql = await orderPartner.query()
//     .select("id", "productid")
//     .where("partnerid", "=", 1)
//     .orderBy("id");
//   return sql;
// };

const partnerOrder = async (req, res) => {
  const sql = await Partner.query()
    .select("nuc_partner.id", "company", "order:product.id as proid")
    .withGraphJoined("order.[product.[package]]")
    // .modifiers({
    //   // selectFields: (query) => query.select("productid", "packageid", "name"),
    //   filterPackage(query) {
    //     query.modify("filterPackage", "order.packageid");
    //   },
    // })
    .where("nuc_partner.active", "=", 1)
    // .where("order:product:package.packageid", 1)
    .orderBy("nuc_partner.id");

  const sql1 = Partner.query()
    .select("nuc_partner.id", "company")
    // .withGraphJoined("order")
    // .modifyGraph("order", (query) => query.select("packageid"))
    // .leftJoinRelated("order.[product]")
    .withGraphJoined("order.[product,package]")
    .modifiers({
      // selectFields: (query) => query.select("productid", "packageid", "name"),
      filterPackage(query) {
        query.modify("filterPackage", "order.packageid");
      },
    })
    .where("nuc_partner.active", "=", 1)
    .orderBy("nuc_partner.id")
    // .debug()
    .then((tags) => {
      // console.log(tags);
      return tags;
    })
    .catch((error) => {
      console.log(error);
      res.send("An error occured");
    });
  return sql1;
};

const navigation = async () => {
  const sql = await Navigation.query()
    .select("id", "name", "content", "active")
    .where("active", ">", 0)
    .withGraphFetched("subnav.[subnav]")
    .orderBy("id");
  return sql;
};

const account = async () => {
  const sql = await Acc.query()
    .select("id", "name", "email")
    .where("status", ">", 0)
    // .withGraphFetched("subnav")
    .orderBy("id");
  return sql;
};

const account1 = async () => {
  const sql = await Acc1.query()
    .select("id", "name", "email")
    .where("status", ">", 0)
    // .withGraphFetched("subnav")
    .orderBy("id");
  return sql;
};

const partNav = async () => {
  const sql = await RoleNav.query()
    .select("partnerid", "levelid", "navid")
    .where("partnerid", "=", 1)
    .where("levelid", "=", 1)
    .orderBy("id");
  return sql;
};

// product().then(console.log);
// console.log(ModPackage1);

module.exports = {
  partnerRole,
  product,
  account,
  navigation,
  partNav,
  ModPackage1,
  account1,
  partnerOrder,
  orderPartner,
  listLevel,
  package,
};
