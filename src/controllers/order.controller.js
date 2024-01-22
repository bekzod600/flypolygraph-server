const { Order } = require("../models/order.model");
const order = {
  getAll: async (req, res) => {
    const orders = await Order.find().populate("products.product_id");
    res.status(200).send(orders);
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    const orders = await Order.findById(id);
    if (!orders) res.status(404).send("orders not found");
    res.status(200).send(orders);
  },
  add: async (req, res) => {
    const orders = await Order.create(req.body);
    res.status(201).send(orders);
  },
  upd: async (req, res) => {
    const id = req.params.id;
    const orders = await Order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!orders) return res.status(404).json({ status: "orders not found" });
    res.status(201).json(orders);
  },
  del: async (req, res) => {
    const id = req.params.id;
    const order = await Order.findByIdAndRemove(id);
    if (!order) return res.status(404).json({ success: false, message: "order not found" });

    res.status(200).json({ success: true, data: order });
  },
};

module.exports = order;
