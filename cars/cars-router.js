const express = require("express");
const db = require("../data/connection");
const router = express.Router();
const Cars = {
  getAll() {
    return db("cars");
  },
  getById(id) {
    return db("cars").where({ id }).first();
  },
  create(post) {
    return db("cars")
      .insert(post, "id")
      .then(([id]) => this.getById(id));
  },
  update(id, post) {
    return db("cars")
      .where({ id })
      .update(post)
      .then((count) => (count > 0 ? this.getById(id) : null));
  },
  delete(id) {
    return db("cars").where({ id }).del();
  },
};
router.get("/", (req, res) => {
  Cars.getAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
router.post("/", (req, res) => {
  Cars.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});
module.exports = router;
