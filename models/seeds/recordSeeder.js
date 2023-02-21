const bcrypt = require("bcryptjs");
const db = require("../../config/mongoose");
const Record = require("../record");
const Category = require("../category");
const records = require("./record.json");
const User = require("../user");

const SEED_USER = {
  name: "user1",
  email: "user1@example.com",
  password: "12345678",
};

db.once("open", () => {
  console.log("mongodb connected!");
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then((user) => {
      const userId = user._id;
      return Promise.all(
        Array.from(records, (seedRecord) => {
          return Category.findOne({ name: seedRecord.category })
            .lean()
            .then((category) => {
              return Record.create({
                name: seedRecord.name,
                Date: seedRecord.Date,
                amount: seedRecord.amount,
                categoryId: category._id,
                userId,
              });
            });
        })
      );
    })
    .then(() => {
      console.log("recordSeeder done!");
      process.exit();
    })
    .catch((error) => console.error(error));
});
