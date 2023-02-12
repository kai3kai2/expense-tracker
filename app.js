const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const Record = require("./models/record");
const bodyParser = require("body-parser");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const PORT = 3000;

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI);

app.engine("hbs", exphbs({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodv error");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

app.get("/", (req, res) => {
  Record.find()
    .lean()
    .then((records) => res.render("index", { records }))
    .catch((err) => console.log(err));
});
app.get("/records/new", (req, res) => {
  return res.render("new");
});

app.post("/records", (req, res) => {
  const { name, amount, Date } = req.body;
  return Record.create({ name, amount, Date })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

app.get("/records/:id/edit", (req, res) => {
  const id = req.params.id;
  return Record.findById(id)
    .lean()
    .then((record) => res.render("edit", { record }));
});

app.post("/records/:id/edit", (req, res) => {
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

app.post("/records/:id/delete", (req, res) => {
  const id = req.params.id;
  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

app.listen(PORT, () =>
  console.log(`App is listening on https://localhost:${PORT}`)
);
