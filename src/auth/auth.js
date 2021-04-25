const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/User");
//funcao recebe uma instancia do passport
//Utilizando a estratégia local para fazer a autenticação do usuário
module.exports = function (passport) {
  passport.use(
    new localStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        try {
          //Pesquisando um usuário no MySql
          User.findOne({ where: { username: username } })
            .then((user) => {
              if (!user) {
                return done(null, false, { message: "Esta conta não existe" });
              }
              bcrypt.compare(password, user.password, (error, isEqual) => {
                if (isEqual) { 
                  //Usuario autorizado a loggar no sistema
                  return done(null, user);
                } else {
                  // caso o hash das senhas não seja iguais 
                  // usuario NÃO autorizado a logar no sistema
                  return done(null, false, {
                    message: "Senha  ou email incorretos!!!",
                  });
                }
              });
            })
            .catch((err) => {
              //Caso o usuário não exista no MySql
              return done(null, false, { message: "Usuário não encontrado no servidor!" });
            });
        } catch (err) {
          return done(null, false, {
            message: "Erro inesperado tente mais tarde!",
          });
        }
      }
    )
  );

  //Salva dados do usuário na sessao em memmoria
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  //Verifica se o usuario é valido
  passport.deserializeUser((user, done) => {
    try {
      const userFind = User.findByPk(user.id);
      if (!userFind) {
        return done(null, null);
      }
      done(null, user);
    } catch (err) {
      return done(err, null);
    }
  });
};
