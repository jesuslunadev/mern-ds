const bcrypt = require("bcryptjs");

module.exports = {
  async up(db, client) {
    const category = await db.collection('contentCategories').findOne({name: "images"});
    const theme = await db.collection('themes').findOne({name: "ciencias"});
    const permission = await db.collection('permissions').findOne({role: "Administrador"});


    if (permission) {
      const hashedPassword = await bcrypt.hash("testPassword", 10);

      await db.collection('users').insertMany([
        {
          username: "admin",
          email: "admin@example.com",
          password: hashedPassword,
          role: permission._id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    if (category && theme) {

      const user = await db.collection('users').findOne({email: "admin@example.com"});


      await db.collection('contents').insertMany([
        {
          title: "Ejemplo de imagen, contenido",
          description: "Este es un ejemplo de contenido",
          category: category._id,
          theme: theme._id,
          createdBy: user._id,
          createdAt: new Date(),
          contentUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
        },
      ]);
    }


  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
