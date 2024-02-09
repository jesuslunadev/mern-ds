const mongoose = require('mongoose');

const PermissionsSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,
    enum: ['Administrador', 'Lector', 'Creador'],
  },
  actions: [{
    type: String,
    enum: ['create', 'read', 'update', 'delete'],
  }],
});

const Permissions = mongoose.model('Permissions', PermissionsSchema,"permissions");

module.exports = Permissions;
