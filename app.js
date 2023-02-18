const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const handlebars = require("handlebars");
const usePassport = require("./config/passport");
const routes = require("./routes");
require("./config/mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const PORT = 3000;

app.engine("hbs", exphbs({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
handlebars.registerHelper("ifEquals", function (a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});
app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));

usePassport(app);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

app.use(routes);

app.listen(PORT, () =>
  console.log(`App is listening on https://localhost:${PORT}`)
);
