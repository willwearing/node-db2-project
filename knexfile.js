// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
    useNullAsDefault: true,
    migration: {
      directory: "../data/migrations",
    },
  },

  staging: {},

  production: {},
};
