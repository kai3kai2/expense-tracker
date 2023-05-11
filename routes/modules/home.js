const express = require("express");
const router = express.Router();
const Category = require("../../models/category");
const Record = require("../../models/record");
const moment = require("moment");

// 先做好總和函式
function total(records) {
  let total = 0;
  records.map((record) => {
    total = total + record.amount;
  });
  return total;
}

router.get("/", (req, res) => {
  const userId = req.user._id;
  let totalAmount = 0;

  Category.find({})
    .lean()
    .then((categories) => {
      Record.find({ userId })
        .populate("categoryId")
        .lean()
        .sort({ Date: -1, name: 1 })
        .then((records) => {
          records.forEach((record) => {
            totalAmount = total(records);
            record.Date = moment(record.Date).format("YYYY/MM/DD  ddd");
          });

          return res.render("index", {
            records,
            categories,
            totalAmount,
          });
        });
    })
    .catch((err) => console.error(error));
});

router.get("/search", (req, res) => {
  const userId = req.user._id;
  const categoryId = req.query.categoryId;
  let totalAmount = 0;

  if (!categoryId) {
    return res.redirect("/");
  }

  Category.find({})
    .lean()
    .then((categories) => {
      categories.forEach((category) => {
        category.preset = String(category._id) === categoryId;
        //   if (String(category._id) === categoryId) {
        //     category.preset = true;
        //   } else {
        //     category.preset = false;
        //   }
      });
      Record.find({ userId, categoryId })
        .populate("categoryId")
        .lean()
        .sort({ date: -1 })
        .then((records) => {
          records.forEach((record) => {
            totalAmount = total(records);
            record.Date = moment(record.Date).format("YYYY/MM/DD  ddd");
          });

          return res.render("index", {
            categories,
            records,
            totalAmount,
          });
        });
    })
    .catch((error) => console.error(error));
});

module.exports = router;
