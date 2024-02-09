const mongoose = require('mongoose');

const ContentCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  permissions: [String],
});

const ContentCategory = mongoose.model('ContentCategory', ContentCategorySchema, "contentCategories");

module.exports = ContentCategory;
