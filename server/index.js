const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const pizzaRouter = require("./routers/pizzaRoutes");
const toppingsRouter = require("./routers/toppingsRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.use(cors());
app.use(express.json());

app.use("/pizzas", pizzaRouter);
app.use("/toppings", toppingsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

module.exports = app;
