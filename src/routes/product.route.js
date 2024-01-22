const product = require("../controllers/product.controller");
const router = require("express").Router();

router.route("/").get(product.getAll).post(product.add);
router.route("/:id").get(product.getOne).patch(product.upd).delete(product.del);

module.exports = router;

// router.use(
//   "/the-best-3-tours",
//   (req, res, next) => {
//     req.query.sort = "-price";
//     req.query.limit = 3;
//     next();
//   },
//   tourController.getAllTours
// );
