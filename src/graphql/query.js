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
    .select("id", "name")
    // .where("partnerid", "=", 1)
    .withGraphFetched("package")
    .modifiers({
      package(query) {
        query.orderBy("v_package.packageid");
      },
    })
    .orderBy("id");
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

const mPackage = async () => {
  const sql = await Package.query()
    .select("packageid", "name", "navigation")
    .where("productid", "=", 1)
    .orderBy("packageid");
  return sql;
};

const orderPartner = async () => {
  const sql = await OrderPartner.query()
    .select("id", "order_number")
    .where("partnerid", "=", 1)
    .withGraphFetched("partner")
    .withGraphFetched("product.[package]")
    .orderBy("mer_partner_order.id");
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
    .select("id", "company")
    .where("active", "=", 1)
    .withGraphFetched("order")
    .orderBy("id");
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
  mPackage,
};
