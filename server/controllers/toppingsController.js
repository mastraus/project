const service = require("../services/toppingsServices");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function getToppings(req, res, next) {
  const data = await service.fetch();
  res.json(data);
}

async function createTopping(req, res, next) {
  const newTopping = req.body;
  const checkDuplicate = await service.read(newTopping);
  if (!checkDuplicate) {
    try {
      const topping = await service.post(newTopping);
      if (topping) {
        res.status(200).json({ new: topping });
      } else {
        res.status(404).json({ message: "Cannot add new topping" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error creating new topping", error: err });
    }
  } else {
    res.status(500).json({ message: "Cannot have duplicate toppings" });
  }
}

async function updateTopping(req, res) {
  const id = req.params.id;
  const changes = req.body;
  const checkDuplicate = await service.read(changes);
  if (!checkDuplicate) {
    try {
      const topping = await service.update(id, changes);
      if (topping) {
        res.status(200).json({ updated: topping });
      } else {
        res.status(404).json({ message: "Not able to update" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error updating", error: err });
    }
  } else {
    res.status(500).json({ message: "Cannot have duplicate toppings" });
  }
}

async function destroy(req, res) {
  await service.delete(req.params.id);
  res.sendStatus(204).json();
}

module.exports = {
  getToppings: asyncErrorBoundary(getToppings),
  createTopping: asyncErrorBoundary(createTopping),
  updateTopping: asyncErrorBoundary(updateTopping),
  deleteTopping: asyncErrorBoundary(destroy),
};
