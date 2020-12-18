const express = require("express");
const authRouter = require("./auth");
const usersRouter = require("./users");
const categoryRouter = require("./category");
const productRouter = require("./product");
const orderRouter = require("./order");
const customizeRouter = require("./customize");
const brainTreeRouter = require("./braintree");

const app = express();

app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/customize", customizeRouter);
app.use("/api", brainTreeRouter);

module.exports = app;
