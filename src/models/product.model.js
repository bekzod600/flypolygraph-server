const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 128, minLength: 3 },
    description: { type: String, required: true, maxLength: 1024, minLength: 3 },
    images: { type: Array, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
    price: { type: Number, required: true, min: 100, max: 10000000000000 },
    currency: { type: String, required: true, enum: ["kg", "gr", "dona"] },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", schema);
module.exports = { Product, ProductSchema: schema };
