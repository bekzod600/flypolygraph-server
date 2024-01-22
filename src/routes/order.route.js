const order = require("../controllers/order.controller");
const router = require("express").Router();

router.route("/").get(order.getAll).post(order.add);
router.route("/:id").get(order.getOne).put(order.upd).delete(order.del);

module.exports = router;
