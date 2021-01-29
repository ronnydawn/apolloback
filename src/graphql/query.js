const { Person, Partner, Level } = require("./models/Codes");
const { RoleNav, Nav, ModNav } = require("./models/Codew");

const level = async () => {
  const sql = await Level.query()
    .select("levelid", "name")
    // .where("partnerid", "=", 1)
    .withGraphFetched("navigation")
    .orderBy("levelid");
  return sql;
};

const partner = async () => {
  const sql = await Partner.query()
    .select("id", "company")
    .where("partnerid", "=", 1)
    .withGraphFetched("rolenav")
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
// console.log(level);

module.exports = { navigation, partNav, partner, level };
