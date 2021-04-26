const User = require("../models/User");
const axios = require("axios");
const { enccript, comparePassword } = require("../helpers/util");
const passport = require("passport");

module.exports = {
  //salva  o dados do usuário no MySql
  async store(req, res) {
    let errors = [];
    if (
      !req.body.username ||
      typeof req.body.username == undefined ||
      req.body.username == null
    ) {
      errors.push({ msg: "Email invalid!" });
    }
    //Validação da senha
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
    if (req.body.password.length < 6) {
      errors.push({
        msg: "As senhas deve conter mais mais de seis caracteres!",
      });
    }

    if (errors.length > 0) {
      res.render("/login", { errors: errors });
    } else {
      let { username, password } = req.body;
      //Ao salvar o usuario salva o primeiro registro do timestamp
      let last_login = new Date(null);

      // pega a senha e transforma  em hash para nao ser salva direto no banco
      password = enccript(password);

      //Se NAO encontrar o usuário no MySql, entao cria se um novo usuário.
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

  async info(req, res) {
    const username = req.body.username;
    axios({
      method: "GET",
      url: `https://api.github.com/search/users?q=${username}`,
    })
      .then((response) => {
        req.flash("success_msg", "Acesso com sucesso ao GitHu!");

        res.render("user/infos", {
          items: response.data.items,
          style: "custom/infos.css",
        });
      })
      .catch((error) => {
        req.flash(
          "error_msg",
          `Erro ao conectar ao GitHub com status ${error.response.status}`
        );
      });
  },
  //View de logar no sistema
  async sinup(req, res) {
    res.render("user/login");
  },
  //View para criar usuário
  async register(req, res) {
    res.render("user/register");
  },
  //
  async result(req, res) {
    const username = req.user.username;
    //Atualizando o ultimo Login do usuário
    await User.update(
      { last_login: new Date() },
      {
        where: {
          username: username,
        },
      }
    )
      .then(() => {
        console.log("User atualizado!");
      })
      .catch((error) => {
        console.log(error);
      });
    res.render("user/result");
  },

  //Metodo para sair do sistema!
  async logout(req, res) {
    req.logout();
    req.flash("success_msg", "Logout realizado com sucesso!");
    res.redirect("/");
  },
  //Metodo de auticação do passport
  async login(req, res, next) {
    await passport.authenticate("local", {
      successRedirect: "/result",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  },
};
