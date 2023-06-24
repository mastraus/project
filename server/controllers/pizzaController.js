const service = require("../services/pizzaServices");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function getPizzas(req, res, next) {
  const data = await service.getAllPizzas();
  res.json(data);
}

module.exports = {
  getPizzas: getPizzas,
};
