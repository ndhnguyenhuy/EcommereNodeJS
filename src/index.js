const express = require("express");
const { engine } = require("express-handlebars");
require("dotenv").config();
const app = express();
const path = require("path");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const port = 3000;
const route = require("./routes");
const db = require("./config/db");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
// Connect to Db
db.connect();

// HTTP logger note
app.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/")));

app.use(express.urlencoded());

app.use(express.json());
// template engine

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource/view/"));
app.set("view options", { layout: "login" });
// app.set("view options", { layout: "other" });
// res.render("view", { title: "my other page", layout: "other" });

//Route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
