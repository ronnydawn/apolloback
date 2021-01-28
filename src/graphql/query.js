const { Person, Partner } = require("./models/Codes");
const { RoleNav, Nav, ModNav } = require("./models/Codew");

const partner = async () => {
  const sql = await Partner.query()
    .select("id as partnerid", "company")
    .where("active", ">", 0)
    // .withGraphFetched("rolenav")
    .orderBy("id");
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
// console.log(partner);

module.exports = { navigation, partNav, partner };
