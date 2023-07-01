const router = require("express").Router();
const app = require("..");
const controller = require("../controllers/toppingsController");

router.route("/").post(controller.createTopping).get(controller.getToppings);

router
  .route("/:id")
  .put(controller.updateTopping)
  .delete(controller.deleteTopping);

module.exports = router;
