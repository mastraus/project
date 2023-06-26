const router = require("express").Router();
const app = require("../app");
const controller = require("../controllers/toppingsController");
// const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  // .post(controller.createPizza)
  .get(controller.getToppings);
// .put(controller.updatePizza)
// .delete(controller.deletePizza)

module.exports = router;
