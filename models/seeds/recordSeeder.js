const bcrypt = require("bcryptjs");
const db = require("../../config/mongoose");
const Record = require("../record");
const User = require("../user");
const SEED_USER = {
  name: "user1",
  email: "user1@example.com",
  password: "12345678",
};

const SEED_RECORD = [
  {
    name: "宵夜",
    date: "2023/1/28",
    amount: 80,
    categoryId: "4",
  },
  {
    name: "精油",
    date: "2023/1/28",
    amount: 280,
    categoryId: "1",
  },
];

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
        Array.from({ length: 2 }, (_, i) =>
          Record.create({
            name: SEED_RECORD[i].name,
            amount: SEED_RECORD[i].amount,
            Date: SEED_RECORD[i].date,
            category: SEED_RECORD[i].categoryId,
            userId,
          })
        )
      );
    })
    .then(() => {
      console.log("recordSeeder done!");
      process.exit();
    });
});
