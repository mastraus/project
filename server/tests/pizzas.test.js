const request = require("supertest");

const app = require("../app");
const db = require("../db/connection");

describe("Pizzas routes", () => {
  test("should return a list of all available pizzas", async () => {
    const response = await request(app).get("/pizzas");
    const data = response.body;

    expect(data).toEqual(
      expect.objectContaining({
        2: {
          pizza_name: "Pepperoni",
          toppings: [
            {
              topping_id: 1,
              topping_name: "Pepperoni",
            },
            {
              topping_id: 2,
              topping_name: "Sausage",
            },
            {
              topping_id: 3,
              topping_name: "Canadian Bacon",
            },
            {
              topping_id: 4,
              topping_name: "Black Olive",
            },
            {
              topping_id: 5,
              topping_name: "Wild Donkey",
            },
          ],
        },
      })
    );
    expect(response.body.error).toBeUndefined();
  });

  test("should create a new pizza with multiple toppings", async () => {
    const response = await request(app)
      .post("/pizzas")
      .send({
        pizza_name: "The Wild West",
        topping_ids: [1, 2, 3],
      });

    expect(response.body.error).toBeUndefined();
    expect(response.body.data).toHaveReturned;
  });

  test("should create a new pizza with 1 topping", async () => {
    const response = await request(app)
      .post("/pizzas")
      .send({
        pizza_name: "Sausage",
        topping_ids: [2],
      });

    expect(response.body.error).toBeUndefined();
    expect(response.body.data).toHaveReturned;
  });

  test("should create a new pizza with no toppings", async () => {
    const response = await request(app).post("/pizzas").send({
      pizza_name: "Boring A** Pizza",
      topping_ids: [],
    });

    expect(response.body.error).toBeUndefined();
    expect(response.body.data).toHaveReturned;
  });

  test("should not allow duplicate pizza names when creating", async () => {
    const response = await request(app)
      .post("/pizzas")
      .send({
        pizza_name: "Meatlovers",
        topping_ids: [2],
      });

    expect(response.body.data).toThrowError;
  });

  test("should update an existing pizza name", async () => {
    const response = await request(app).put("/pizzas/1").send({
      pizza_name: "The Kids' Favorite",
      topping_ids: [],
    });

    expect(response.body.error).toBeUndefined();
    expect(response.body.data).toHaveReturned;

    const updatedName = await db("pizza_names").where({ id: 1 }).first();

    expect(updatedName.pizza_name).toBe("The Kids' Favorite");
  });

  test("should update an existing pizza with less toppings", async () => {
    const response = await request(app)
      .put("/pizzas/3")
      .send({
        pizza_name: "Meatlovers",
        topping_ids: [2, 3],
      });
    expect(response.body.error).toBeUndefined();
    expect(response.body.data).toHaveReturned;
  });

  test("should not allow duplicate topping names when updating", async () => {
    const response = await request(app).put("/pizzas/2").send({
      pizza_name: "Cheese",
      topping_ids: [],
    });

    expect(response.body.data).toThrowError;
  });

  test("should delete the specified pizza", async () => {
    const response = await request(app).delete("/pizzas/3");

    expect(response.statusCode).toBe(204);
  });
});
