const express = require("express");
const errorMiddleware = require("../src/middleware/errors");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const categoryRoute = require("../src/routes/category.route");
const productRoute = require("../src/routes/product.route");
const orderRoute = require("../src/routes/order.route");

module.exports = function (app) {
  app.use(cors());
  app.use(fileUpload({ useTempFiles: true }));
  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/products", productRoute);
  app.use("/api/v1/orders", orderRoute);

  app.use(errorMiddleware);
};
