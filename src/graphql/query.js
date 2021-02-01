const { Person, Partner, PartnerOrder, Level } = require("./models/Codes");
const { RoleNav, Nav, ModNav } = require("./models/Codew");

const level = async () => {
  const sql = await Level.query()
    .select("levelid", "name")
    // .where("partnerid", "=", 1)
    .withGraphFetched("navigation")
    .orderBy("levelid");
  return sql;
};

const partnerOrder = async () => {
  const sql = await PartnerOrder.query()
    .select("mer_partner_order.id as id", "b.company", "b.email", "productid", "c.name")
    // .leftJoin("nuc_partner", "mer_partner_order.partnerid", "nuc_partner.id")
    .joinRelated("partner as b")
    .joinRelated("product as c")
    .where("partnerid", "=", 1)
    .withGraphFetched("product")
    .orderBy("mer_partner_order.id");
  return sql;
};

const navigation = async () => {
  const sql = await Nav.query()
    .select("id", "name", "content", "active")
    .where("active", ">", 0)
    .withGraphFetched("subnav")
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

// partner.query().then(console.log);
// console.log(level);

module.exports = { navigation, partNav, partnerOrder, level };
