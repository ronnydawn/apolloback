require("dotenv").config();

module.exports = {
  // DEVELOPMENT
  development: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: "./src/data/migrations",
    },
    seeds: { directory: "./src/data/seeds" },
  },

  // TEST
  test: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: "./src/data/migrations",
    },
    seeds: { directory: "./src/data/seeds" },
  },

  // PRODUCTION
  production: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: "./src/data/migrations",
    },
    seeds: { directory: "./src/data/seeds" },
  },
};
