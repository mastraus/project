const router = require("express").Router();
const app = require("..");
const controller = require("../controllers/pizzaController");

router.route("/").post(controller.createPizza).get(controller.getPizzas);

router.route("/:id").put(controller.updatePizza).delete(controller.deletePizza);

module.exports = router;
