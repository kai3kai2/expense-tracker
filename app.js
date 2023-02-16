const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const Record = require("./models/record");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routes = require("./routes");
const usePassport = require("./config/passport");
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
