const {
  Acc1,
  ModPackage,
  ModPackage1,
  Package,
  Person,
  Partner,
  PartnerOrder,
  Level,
} = require("./models/Codes");
const { RoleNav, Nav, ModNav, Acc } = require("./models/Codew");

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
    .where("productid", "=", 1);
  return sql;
};

const partnerOrder = async () => {
  const sql = await PartnerOrder.query()
    .select(
      "mer_partner_order.id as id",
      "b.company",
      "b.email",
      "productid",
      "c.name"
    )
    .joinRelated("partner as b")
    .joinRelated("product as c")
    .where("partnerid", "=", 1)
    .withGraphFetched("product")
    .orderBy("mer_partner_order.id");
  return sql;
};

// const partnerOrder = async () => {
//   const sql = await PartnerOrder.query()
//     .select("id", "productid")
//     .where("partnerid", "=", 1)
//     .orderBy("id");
//   return sql;
// };

const partner = async () => {
  const sql = await Partner.query()
    .select("id", "company")
    .where("active", "=", 1)
    .orderBy("id");
  return sql;
};

const navigation = async () => {
  const sql = await Nav.query()
    .select("id", "name", "content", "active")
    .where("active", ">", 0)
    // .withGraphFetched("subnav")
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

// ModPackage1().then(console.log);
// console.log(ModPackage1);

module.exports = {
  account,
  navigation,
  partNav,
  ModPackage1,
  account1,
  partner,
  partnerOrder,
  level,
  mPackage,
};
