const service = require("../services/toppingsServices");

async function getToppings(req, res, next) {
  const data = await service.getAllToppings();
  res.json(data);
}

module.exports = {
  getToppings: getToppings,
};
