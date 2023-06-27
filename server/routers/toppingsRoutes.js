const router = require("express").Router();
const app = require("../app");
const controller = require("../controllers/toppingsController");
// const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").post(controller.createTopping).get(controller.getToppings);

router
  .route("/:id")
  .put(controller.updateTopping)
  .delete(controller.deleteTopping);

module.exports = router;
