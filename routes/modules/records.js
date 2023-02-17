const express = require("express");
const router = express.Router();
const Record = require("../../models/record");

router.get("/new", (req, res) => {
  return res.render("new");
});

router.post("/", (req, res) => {
  const { name, amount, Date } = req.body;
  const userId = req.user._id;
  return Record.create({ name, amount, Date, userId })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render("edit", { record }))
    .catch((error) => console.log(error));
});

router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  const { name, amount, category, Date } = req.body;

  return Record.findOne({ _id, userId })
    .then((record) => {
      record.name = name;
      record.Date = Date;
      record.category = category;
      record.amount = amount;
      return record.save();
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;

  return Record.findOne({ _id, userId })
    .then((record) => record.remove())
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
