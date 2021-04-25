const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("./auth/auth")(passport);
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

require("../src/database");
//Instancia do express
const app = express();

app.use(
  session({
    secret: "junior",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

const routes = require("./router/routers");
// Midlewares

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});
//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handlebars
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: ".hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
// Public
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  next();
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Config Express
app.use(routes);
app.get("/", (req, res) => {
  res.render("home/index");
});

app.listen(3000, () => {
  console.log("Server esta no ar");
});
