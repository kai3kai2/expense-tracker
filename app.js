const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const Record = require("./models/record");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const PORT = 3000;

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI);

app.engine("hbs", exphbs({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");

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

app.listen(PORT, () =>
  console.log(`App is listening on https://localhost:${PORT}`)
);
