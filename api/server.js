require("dotenv").config();
require("colors");
const express = require("express");
const helmet = require("helmet");

const carRouter = require("../cars/cars-router");
// const db = require("../data/connection.js");
const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/cars", carRouter);

server.get("/", (req, res) => {
  res.json("Server is up");
});

module.exports = server;
