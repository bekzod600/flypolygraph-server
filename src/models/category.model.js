const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 128, minLength: 3 },
    image: { type: Object, required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("categories", schema);

module.exports = { Category, CategorySchema: schema };
