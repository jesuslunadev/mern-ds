const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  contentPermissions: {
    images: Boolean,
    videos: Boolean,
    texts: Boolean,
  },
});

const Theme = mongoose.model('Theme', ThemeSchema);

module.exports = Theme;
