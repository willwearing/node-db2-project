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

//get all
router.get("/", (req, res) => {
  Cars.getAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//get by id
router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.car);
});

//put
router.put("/:id", validateId, (req, res) => {
  Cars.update(req.params.id, req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//delete
router.delete("/:id", validateId, (req, res) => {
  Cars.delete(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: `Successfully deleted post with id ${req.params.id}`,
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//create/post
router.post("/", (req, res) => {
  Cars.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//middleware
function validateId(req, res, next) {
  const { id } = req.params;
  Cars.getById(id)
    .then((data) => {
      if (data) {
        req.car = data;
        next();
      } else {
        res.status(400).json({ message: `no cars found with id ${id}` });
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
}

module.exports = router;
