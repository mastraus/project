const router = require('express').Router();
const app = require('../app')
const controller = require('../controllers/pizzaController');
// const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    // .post(controller.createPizza)
    .get(controller.getPizzas)
    // .put(controller.updatePizza)
    // .delete(controller.deletePizza)

module.exports = router;