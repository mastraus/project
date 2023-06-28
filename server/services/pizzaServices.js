const knex = require("../db/connection");

function read(pizzaName) {
  return knex("pizza_names")
    .select("*")
    .where({ pizza_name: pizzaName })
    .first();
}

function getPizzaDetails() {
  return knex
    .select(
      "pizza_names.id",
      "pizza_names.pizza_name",
      "pizzas_and_toppings.topping_id",
      "topping_names.topping_name"
    )
    .from("pizza_names")
    .leftJoin(
      "pizzas_and_toppings",
      "pizza_names.id",
      "pizzas_and_toppings.pizza_id"
    )
    .leftJoin(
      "topping_names",
      "pizzas_and_toppings.topping_id",
      "topping_names.id"
    )
    .then((rows) => {
      const pizzaDetails = {};

      rows.forEach((row) => {
        const { id, pizza_name, topping_id, topping_name } = row;

        if (!pizzaDetails[id]) {
          pizzaDetails[id] = {
            pizza_name: pizza_name,
            toppings: [],
          };
        }

        if (topping_id && topping_name) {
          pizzaDetails[id].toppings.push({
            topping_id: topping_id,
            topping_name: topping_name,
          });
        }
      });

      return pizzaDetails;
    })
    .catch((error) => {
      console.error("Error fetching pizza details:", error);
    });
}

function deletePizza(pizzaId) {
  return knex
    .transaction((trx) => {
      return knex("pizzas_and_toppings")
        .transacting(trx)
        .where("pizza_id", pizzaId)
        .del()
        .then(() => {
          return knex("pizza_names")
            .transacting(trx)
            .where("id", pizzaId)
            .del();
        });
    })
    .then(() => {
      console.log("Pizza deleted successfully.");
    })
    .catch((error) => {
      console.error("Error deleting pizza:", error);
    });
}

function postNewPizza(pizzaName, toppingIds) {
  return knex
    .transaction((trx) => {
      let pizzaId;

      return knex("pizza_names")
        .transacting(trx)
        .insert({ pizza_name: pizzaName })
        .returning("id")
        .then((response) => {
          pizzaId = response[0];

          const toppingInserts = toppingIds.map((toppingId) => {
            return {
              pizza_id: pizzaId.id,
              topping_id: toppingId,
            };
          });

          return knex("pizzas_and_toppings")
            .transacting(trx)
            .insert(toppingInserts);
        })
        .then(() => {
          return pizzaId;
        });
    })
    .then((pizzaId) => {
      console.log("Pizza created successfully with ID:", pizzaId);
    })
    .catch((error) => {
      console.error("Error creating pizza:", error);
    });
}

function updatePizza(pizzaId, pizzaName, toppingIds) {
  return knex
    .transaction((trx) => {
      return knex("pizza_names")
        .transacting(trx)
        .where("id", pizzaId)
        .select("pizza_name")
        .first()
        .then((existingPizza) => {
          if (existingPizza.pizza_name !== pizzaName) {
            return knex("pizza_names")
              .transacting(trx)
              .whereNot("id", pizzaId)
              .andWhere("pizza_name", pizzaName)
              .first()
              .then((duplicatePizza) => {
                if (duplicatePizza) {
                  throw new Error("Pizza name already exists.");
                } else {
                  return knex("pizza_names")
                    .transacting(trx)
                    .where("id", pizzaId)
                    .update({ pizza_name: pizzaName });
                }
              });
          }
        })
        .then(() => {
          return knex("pizzas_and_toppings")
            .transacting(trx)
            .where("pizza_id", pizzaId)
            .pluck("topping_id")
            .then((existingToppings) => {
              const toppingsToRemove = existingToppings.filter(
                (toppingId) => !toppingIds.includes(toppingId)
              );
              const toppingsToAdd = toppingIds.filter(
                (toppingId) => !existingToppings.includes(toppingId)
              );

              const deletionPromise = knex("pizzas_and_toppings")
                .transacting(trx)
                .where("pizza_id", pizzaId)
                .whereIn("topping_id", toppingsToRemove)
                .del();

              const insertionPromise = knex("pizzas_and_toppings")
                .transacting(trx)
                .insert(
                  toppingsToAdd.map((toppingId) => ({
                    pizza_id: pizzaId,
                    topping_id: toppingId,
                  }))
                );

              return Promise.all([deletionPromise, insertionPromise]);
            });
        });
    })
    .then(() => {
      console.log("Pizza updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating pizza:", error);
    });
}

module.exports = {
  postNewPizza,
  getPizzaDetails,
  deletePizza,
  updatePizza,
  read,
};
