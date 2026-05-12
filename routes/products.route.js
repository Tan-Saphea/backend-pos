const express = require("express");
const {
  create,
  findAll,
  findOne,
  update,
  remove,
} = require("../controllers/products.controller");

const router = express.Router();

router.route("/").post(create).get(findAll);

router.route("/:id").get(findOne).patch(update).delete(remove);

module.exports = router;
