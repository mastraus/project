const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const pizzaRouter = require("./routers/pizzaRoutes");
const toppingsRouter = require("./routers/toppingsRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use("/pizzas", pizzaRouter);
app.use("/toppings", toppingsRouter);

module.exports = app;
