const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const PORT = 3000;

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MOGODB_URL);

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
  res.render("index");
});

app.listen(PORT, () =>
  console.log(`App is listening on https://localhost:${PORT}`)
);
