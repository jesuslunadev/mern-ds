const bcrypt = require('bcryptjs');


module.exports = {
  async up(db, client) {
    await db.collection('users').createIndex({"email": 1}, {unique: true});
    await db.collection('users').createIndex({"username": 1}, {unique: true});
  },

  async down(db, client) {
    await db.collection('users').drop();
  }
};
