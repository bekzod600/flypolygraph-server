const { Category } = require("../models/category.model");
const { upload_img, delete_img } = require("../helpers/img_upload");
const { Product } = require("../models/product.model");
const mongoose = require("mongoose");

const category = {
  getAll: async (req, res) => {
    const categories = await Category.find();
    res.status(200).send(categories);
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    const categories = await Category.findById(id);
    if (!categories) res.status(404).send("categories not found");
    res.status(200).send(categories);
  },
  add: async (req, res) => {
    if (!req.files || !req.files.image) return res.status(400).json({ message: "No image uploaded" });

    const { tempFilePath } = req.files.image;
    const result = await upload_img(tempFilePath, "categories");

    const categories = new Category(req.body);
    categories.image = { secure_url: result.secure_url, public_id: result.public_id };
    await categories.save();

    res.status(201).send(categories);
  },
  upd: async (req, res) => {
    const id = req.params.id;
    if (req.files && req.files.image) {
      // delete old image
      const ct = await Category.findById(id);
      await delete_img(ct.image.public_id);

      // upload image
      const { tempFilePath } = req.files.image;
      const result = await upload_img(tempFilePath, "categories");
      req.body.image = { secure_url: result.secure_url, public_id: result.public_id };
    }

    const categories = await Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!categories) return res.status(404).json({ status: "categories not found" });
    res.status(201).json(categories);
  },
  del: async (req, res) => {
    const id = req.params.id;
    const cate = await Category.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category_id",
          as: "products_from_category",
        },
      },
    ]);
    if (!cate.length) return res.status(404).json({ success: false, message: "category not found" });
    if (cate[0].products_from_category.length)
      return res.status(500).json({ success: false, message: "Ushbu kategoriyada mahsulot mavjud." });

    const category = await Category.findByIdAndRemove(id);
    await delete_img(category.image.public_id);
    res.status(200).json({ success: true });
  },
};

module.exports = category;
