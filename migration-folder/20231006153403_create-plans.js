/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('plans', table => {
    table.string('id').primary();
    table.string('plan').notNullable();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('price').notNullable();
    table.integer('order').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.json('features');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('plans');
};
