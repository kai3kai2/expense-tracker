const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("warning_msg", "請再次確認您的信箱與密碼是否都有填寫");
      return res.redirect("/users/login");
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureMessage: true,
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  // 取得輸入資料
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "所有欄位都是必填。" });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與密碼確認不相符!" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }
  // 檢查註冊狀態
  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ message: "信箱已經註冊過了!" });
        return res.render("register", {
          errors,
          name,
          email,
          password,
          confirmPassword,
        });
      }
      return bcrypt
        .genSalt(8)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash,
          })
        )
        .then(() => res.redirect("/"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已經成功登出。歡迎下次再使用!");
  res.redirect("/users/login");
});

module.exports = router;
