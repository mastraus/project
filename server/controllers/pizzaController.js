const service = require("../services/pizzaServices");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function getPizzas(req, res, next) {
  const data = await service.getPizzaDetails();
  res.json(data);
}

async function createPizza(req, res) {
  const newPizza = req.body;
  const toppingIds = newPizza.topping_ids;
  const pizzaName = newPizza.pizza_name;
  const checkDuplicate = await service.read(pizzaName);

  if (!checkDuplicate) {
    try {
      const pizza = await service.postNewPizza(pizzaName, toppingIds);
      if (pizza) {
        res.status(200).json({ updated: pizza });
      } else {
        res.status(404).json({ message: "Not able to update" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error updating", error: err });
    }
  } else {
    res.status(500).json({ message: "Cannot have duplicate pizzas" });
  }
}

async function updatePizza(req, res) {
  const pizzaId = parseInt(req.params.id, 10);
  ("Parsed pizza ID:");
  typeof pizzaId;
  const changes = req.body;
  const pizzaName = changes.pizza_name;
  `controller update name: ${pizzaName}`;
  typeof pizzaName;
  const toppingIds = changes.topping_ids;
  `controller update pizzatoppings: ${toppingIds}`;
  typeof toppingIds;
  const pizza = await service.updatePizza(pizzaId, pizzaName, toppingIds);
  res.json(pizza);
}

async function destroy(req, res) {
  await service.deletePizza(req.params.id);
  res.sendStatus(204).json();
}

module.exports = {
  getPizzas: asyncErrorBoundary(getPizzas),
  createPizza: asyncErrorBoundary(createPizza),
  updatePizza: asyncErrorBoundary(updatePizza),
  deletePizza: asyncErrorBoundary(destroy),
};
