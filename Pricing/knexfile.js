// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'mysql',
  connection: {
    database: process.env.DB_DATABASE,
    user:     process.env.DB_USER,
    host:     process.env.DB_HOST,
    password: process.env.DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'migration-folder',
  }
};



