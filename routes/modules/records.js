const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");
const category = require("../../models/category");
const moment = require("moment");

router.get("/new", (req, res) => {
  Category.find({})
    .lean()
    .then((categories) => {
      return res.render("new", { categories });
    });
});

router.post("/", (req, res) => {
  const { name, amount, Date, categoryId } = req.body;
  const userId = req.user._id;

  return Record.create({ name, amount, Date, categoryId, userId })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  Category.find({})
    .lean()
    .then((categories) => {
      return Record.findOne({ _id, userId })
        .lean()
        .then((record) => {
          categories.forEach((category) => {
            category.preset = String(category._id) === String(record.categoryId);
          });
          record.Date = moment(record.date).format("YYYY-MM-DD");
          res.render("edit", { record, categories });
        });
    });
});

router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  const { name, amount, categoryId, Date } = req.body;
  const errors = [];

  return Record.findOne({ _id, userId })
    .then((record) => {
      record.name = name;
      record.Date = Date;
      record.categoryId = categoryId;
      record.amount = amount;
      return record.save();
    })
    .then(() => req.flash("success_msg", "修改成功!"))
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;

  return Record.findOne({ _id, userId })
    .then((record) => record.remove())
    .then(() => req.flash("success_msg", "資料刪除成功!"))
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
