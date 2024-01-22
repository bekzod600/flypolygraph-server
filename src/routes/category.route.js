const category = require("../controllers/category.controller");
const router = require("express").Router();

router.route("/").get(category.getAll).post(category.add);
router.route("/:id").get(category.getOne).patch(category.upd).delete(category.del);

module.exports = router;
