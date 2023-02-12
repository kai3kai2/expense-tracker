const express = require("express");
const router = express.Router();
const Record = require("../../models/record");

router.get("/new", (req, res) => {
  return res.render("new");
});

router.post("/", (req, res) => {
  const { name, amount, Date } = req.body;
  return Record.create({ name, amount, Date })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  return Record.findById(id)
    .lean()
    .then((record) => res.render("edit", { record }));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, amount, Date } = req.body;

  return Record.findById(id)
    .then((record) => {
      record.name = name;
      record.amount = amount;
      record.Date = Date;
      return record.save();
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
