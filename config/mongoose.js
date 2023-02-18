const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.set("strictQuery", true);
// mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodv error");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

module.exports = db;
