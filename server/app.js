const express = require("express");
const app = express();
const cors = require("cors");

//const errorHandler
//const notFound

const pizzaRouter = require("./routers/pizzaRoutes");
// const toppingsRouter = require('./routers/toppingsRoutes');

app.use(cors());
app.use(express.json());

app.use("/pizzas", pizzaRouter);

module.exports = app;
