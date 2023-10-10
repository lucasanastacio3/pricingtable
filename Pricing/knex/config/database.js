const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile);

// knex('users').then(data => console.log(data)); // SELECT * FROM users

module.exports = knex;

