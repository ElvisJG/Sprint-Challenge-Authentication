const db = require('../database/dbConfig');

module.exports = {
  add,
  findBy
};

// Sets ID to await an insertion of a new user into the users DB then finds the user using the
// Given ID and returns it
async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}
// Using a given filter, filters users table and returns the filtered user
async function findBy(filter) {
  return db('users').where(filter);
}

// Using a given ID, finds the ID within the users table and returns the first user found matching that ID
async function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
