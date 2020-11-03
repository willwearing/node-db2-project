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

server.get("/api/cars", (req, res) => {
  db("cars")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = server;
