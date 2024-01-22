const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true, maxLength: 128, minLength: 3 },
    phone: { type: String, required: true, maxLength: 16, minLength: 9 },
    products: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, min: 0, max: 9999999 },
      },
    ],
    totalPrice: { type: Number, min: 0, max: 9999999999 },
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", schema);
module.exports = { Order, OrderSchema: schema };
