module.exports = {
  async up(db, client) {
    await db.collection('contentCategories').insertMany([
      {name: 'images', permissions: ['CRUD', 'R']},
      {name: 'videos', permissions: ['CRUD', 'R']},
      {name: 'documents', permissions: ['CRUD', 'R']},
    ]);

    await db.collection('themes').insertMany([
      {name: 'ciencias', contentPermissions: {images: true, videos: true, texts: true}},
      {name: 'matemáticas', contentPermissions: {images: true, videos: true, texts: true}},
      {name: 'deporte', contentPermissions: {images: true, videos: true, texts: true}},
    ]);

  },

  async down(db, client) {
    await db.collection('contentCategories').drop();
    await db.collection('themes').drop();
  }
};
