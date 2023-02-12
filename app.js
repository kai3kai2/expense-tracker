const express = require("express");
const exphbs = require("express-handlebars");
const Record = require("./models/record");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routes = require("./routes");
require("./config/mongoose");

const app = express();
const PORT = 3000;

app.engine("hbs", exphbs({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(routes);

app.listen(PORT, () =>
  console.log(`App is listening on https://localhost:${PORT}`)
);
