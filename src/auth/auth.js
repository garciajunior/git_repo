const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "username", passwordField: "password" },
      (username, password, done) => {
        User.findOne({ where: { username: username } })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "Esta conta não existe" });
            }
            bcrypt.compare(password, user.password, (erro, batem) => {
              console.log(erro);
              if (batem) {
                console.log("senha sao iguais!", batem);
                return done(null, user);
              } else {
                return done(null, false, {
                  message: "Senha  ou email incorretos!!!",
                });
              }
            });
          })
          .catch((err) => {
            require.flash("error_msg", "Erro ao fazer login" + err);
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findByPk(id, (err, user) => {
      done(err, user);
    });
  });
};
