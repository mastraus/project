const request = require("supertest");

const app = require("../app");
const db = require("../db/connection");

describe("Toppings routes", () => {
  test("should return a list of all available toppings", async () => {
    const response = await request(app).get("/toppings");
    const data = response.body;

    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, topping_name: "Pepperoni" }),
      ])
    );
    expect(data).toHaveLength(5);
    expect(response.body.error).toBeUndefined();
  });

  test("should create a new topping", async () => {
    const response = await request(app).post("/toppings").send({
      topping_name: "Applebee's bourbon street steak",
    });

    expect(response.body.data).toHaveReturned;
    expect(response.body.error).toBeUndefined();
  });

  test("should not allow duplicate topping names when creating", async () => {
    const response = await request(app).post("/toppings").send({
      topping_name: "Pepperoni",
    });

    expect(response.body.data).toThrowError;
  });

  test("should update an existing topping name", async () => {
    const response = await request(app).put("/toppings/1").send({
      topping_name: "Roadkill",
    });

    expect(response.body.data).toHaveReturned;
    expect(response.body.error).toBeUndefined();
  });

  test("should not allow duplicate topping names when updating", async () => {
    const response = await request(app).put("/toppings/1").send({
      topping_name: "Sausage",
    });

    expect(response.body.data).toThrowError;
  });

  test("should delete the specified topping", async () => {
    const response = await request(app).delete("/toppings/3");

    expect(response.statusCode).toBe(204);
  });
});
