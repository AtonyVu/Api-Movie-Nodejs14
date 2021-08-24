const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();
const usersRoutes = require("./routes/userRouter");
const movieRoutes = require("./routes/movieRouter");
const lcRoutes = require("./routes/bookingRouter");
const quanLyRap = require("./routes/showtimesRouter");
const path = require("path");
const { appendFile } = require("fs");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const app = express();
app.use(bodyParser.json());

// app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.options("*", cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,*");
  next();
});

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/lichchieu", lcRoutes);
app.use("/api/v1/quanLyRap", quanLyRap);
module.exports = app;
