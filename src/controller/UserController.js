const User = require("../models/User");
const axios = require("axios");
const { enccript, comparePassword } = require("../helpers/util");
const passport = require("passport");
const { isAuthenticated } = require("../helpers/isLoged");

module.exports = {
  async store(req, res) {
    let errors = [];
    if (
      !req.body.username ||
      typeof req.body.username == undefined ||
      req.body.username == null
    ) {
      errors.push({ msg: "Email invalid!" });
    }
    if (
      !req.body.password ||
      typeof req.body.password == undefined ||
      req.body.password == null
    ) {
      errors.push({ msg: "Senha invalida!" });
    }
    if (req.body.password !== req.body.passwordConfirmed) {
      errors.push({ msg: "As senhas devem ser iguais!" });
    }

    if (errors.length > 0) {
      res.render("/login", { errors: errors });
    } else {
      let { username, password } = req.body;
      let last_login = new Date(null);
      password = enccript(password);
      console.log(username, password);
      console.log(`----${password}-----`);
      User.findOrCreate({
        where: { username: username },
        defaults: { password, last_login },
      }).spread(function (user, created) {
        if (created) {
          req.flash("success_msg", "Usuário cadastrado com sucesso!");

          res.redirect("/login");
        } else {
          req.flash("error_msg", `Usuário existente no nosso servidor`);
          return res.redirect("/login");
        }
      });
    }
  },
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },
  async info(req, res) {
    const username = req.body.username;
    axios({
      method: "GET",
      url: ` https://api.github.com/search/users?q=${username}`,
    })
      .then((response) => {
        res.render("user/infos", { items: response.data.items });
      })
      .catch((err) => {
        console.error("Alguma coisa deu errado", err);
      });
  },

  async sinup(req, res) {
    res.render("user/login");
  },
  async register(req, res) {
    res.render("user/register");
  },
  async linfo(req, res) {
    res.render("user/infos");
  },
  async login(req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/infos");
      });
    })(req, res, next);
  },
};
