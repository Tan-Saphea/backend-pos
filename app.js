const express = require("express");
const notFound = require("./helpers/not-found");
const errorHandler = require("./helpers/error-handler");
const categoryRoute = require("./routes/categories.route");
const customerRoute = require("./routes/customers.route");
const uploadRoute = require("./routes/upload.route");
const productRoute = require("./routes/products.route");
const authRoute = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const { authGuard } = require("./guards/auth.guard");

//init app
const app = express();
app.use(express.json());
app.use(cookieParser());

//for use filtering when use parse
app.set("query parser", "extended");

app.use("/api/categories", authGuard, categoryRoute);
app.use("/api/customers", authGuard, customerRoute);
app.use("/api/upload", authGuard, uploadRoute);
app.use("/api/products", authGuard, productRoute);
app.use("/api/auth", authRoute);

app.use("", notFound);
app.use(errorHandler);

module.exports = app;
