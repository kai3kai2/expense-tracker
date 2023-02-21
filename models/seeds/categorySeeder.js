const db = require("../../config/mongoose");
const Category = require("../category");
const categories = require("./category.json");

db.once("open", () => {
  console.log("mongodb connected!");
  Category.create(categories)
    .then(() => {
      console.log("categorySeeder done!");
      return db.close();
    })
    .catch((err) => console.error(err));
});
