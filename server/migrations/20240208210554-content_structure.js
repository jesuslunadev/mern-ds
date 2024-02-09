module.exports = {
  async up(db, client) {
    await db.collection('contents').createIndexes([
      { key: { category: 1 } },
      { key: { theme: 1 } },
      { key: { createdAt: 1 } }
    ]);
  },

  async down(db, client) {
    await db.collection('contents').drop();
  }
};
