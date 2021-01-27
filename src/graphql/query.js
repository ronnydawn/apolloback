const { Partner } = require("./models/Codes");
const { RoleNav, Nav } = require("./models/Codew");

const navigation = async () => {
  const sql = await Nav.query()
    .select("id", "name", "content")
    .where("active", ">", 0)
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

module.exports = { navigation, partNav };
