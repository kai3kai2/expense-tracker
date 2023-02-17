const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const usePassport = require("./config/passport");
const routes = require("./routes");
require("./config/mongoose");

const app = express();
const PORT = 3000;

app.engine("hbs", exphbs({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));

usePassport(app);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

app.use(routes);

app.listen(PORT, () =>
  console.log(`App is listening on https://localhost:${PORT}`)
);
