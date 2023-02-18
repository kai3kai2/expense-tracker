const express = require("express");
const router = express.Router();
const category = require("../../models/category");

const Record = require("../../models/record");

function total(records) {
  let total = 0;
  records.map((record) => {
    total = total + record.amount;
  });
  return total;
}

router.get("/", (req, res) => {
  let totalAmount = 0;
  const userId = req.user._id;
  const filter = Number(req.query.filter);

  if (filter > 0) {
    Record.find({ category: filter, userId })
      .lean()
      .then((records) => {
        totalAmount = total(records);
        return res.render("index", { records, totalAmount, category: filter });
      });
  } else if (filter == 0) {
    Record.find({ userId })
      .lean()
      .then((records) => {
        totalAmount = total(records);
        return res.render("index", { records, totalAmount });
      });
  } else {
    Record.find({ userId })
      .lean()
      .then((records) => {
        totalAmount = total(records);
        return res.render("index", { records, totalAmount });
      })
      .catch((error) => console.log(error));
  }
});

module.exports = router;
