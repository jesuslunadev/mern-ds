module.exports = {
  async up(db, client) {
    await db.collection('permissions').insertMany([
      {
        role: "Administrador",
        actions: ["create", "read", "update", "delete"],
      },
      {
        role: "Lector",
        actions: ["read"],
      },
      {
        role: "Creador",
        actions: ["create", "read", "update"],
      },
    ]);
  },
  async down(db, client) {
    await db.collection('permissions').drop();
  }
};
