const {
  Product,
  Navigation,
  Acc1,
  ModPackage,
  ModPackage1,
  Package,
  Person,
  Partner,
  OrderPartner,
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

const product = async () => {
  const sql = await Product.query()
    .select("nuc_product.id", "nuc_product.name")
    .withGraphJoined("package")
    // .modifiers({
    //   package(query) {
    //     query.orderBy("packageid", "ASC");
    //   },
    // })
    // .modifyGraph("package", (query) => {
    //   query.orderBy("packageid", "asc");
    // })
    // .where("package.packageid", "asc")
    .orderBy("nuc_product.id", "asc")
    .orderBy("package.packageid", "asc");
  return sql;
};

const level = async () => {
  const sql = await Level.query()
    .select("levelid", "name")
    // .where("partnerid", "=", 1)
    .withGraphFetched("navigation")
    .orderBy("levelid");
  return sql;
};

const package = async () => {
  const sql = await Package.query()
    .select("packageid", "name", "navigation")
    .where("productid", "=", 1)
    .orderBy("packageid", "ASC");
  return sql;
};

const orderPartner = async () => {
  const sql = await OrderPartner.query()
    .select("mer_partner_order.id", "order_number")
    // .where("mer_partner_order.partnerid", "=", 1)
    // .withGraphFetched("partner(orderById)")
    // .modifiers({
    //   orderById(query) {
    //     query.orderBy("id");
    //   },
    // });
    .withGraphJoined("partner")
    .withGraphJoined("product")
    .withGraphFetched("package")
    // .modifiers({
    //   onlyProduct(builder) {
    //     builder.where("productid", 1);
    //   },
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

const partner = async () => {
  const sql = await Partner.query()
    .select("nuc_partner.id", "company")
    .where("nuc_partner.active", "=", 1)
    // .withGraphJoined("order.[product.[package]]")
    .orderBy("nuc_partner.id");
  return sql;
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
  product,
  account,
  navigation,
  partNav,
  ModPackage1,
  account1,
  partner,
  orderPartner,
  level,
  package,
};
