const db = require("../../config/mongoose");
const Record = require("../record");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected");
  for (let i = 0; i < 5; i++) {
    Record.create({
      name: `name${i}`,
      Date: `${Date.now}`,
      amount: `1`,
    });
  }
  console.log("done");
});
