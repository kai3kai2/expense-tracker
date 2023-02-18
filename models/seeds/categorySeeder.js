const db = require("../../config/mongoose");
const Record = require("../record");
const User = require("../user");
const Category = require("../category");

const categoryList = [
  {
    id: 1,
    name: "家居物業",
    icon: '<i class="fa-solid fa-house"></i>',
  },
  {
    id: 2,
    name: "交通出行",
    icon: '<i class="fa-solid fa-van-shuttle"></i>',
  },
  {
    id: 3,
    name: "休閒娛樂",
    icon: '<i class="fa-solid fa-face-grin-beam"></i>',
  },
  {
    id: 4,
    name: "餐飲食品",
    icon: '<i class="fa-solid fa-utensils"></i>',
  },
  {
    id: 5,
    name: "其他",
    icon: '<i class="fa-solid fa-pen"></i>',
  },
];

db.once("open", () => {
  console.log("mongodb connected!");
  return Promise.all(
    Array.from({ length: 5 }, (_, i) =>
      Category.create({
        categoryId: categoryList[i].id,
        name: categoryList[i].name,
        icon: categoryList[i].icon,
      })
    )
  ).then(() => {
    console.log("categorySeeder done!");
    process.exit();
  });
});
