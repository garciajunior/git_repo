module.exports = {
  isAuthenticated: function (req, res, next) {
    if (req.isAuthenticate()) {
      return next();
    }
    req.flash("error_msg", "Voce deve estar Logado para acessar essa pagina!");
    res.redirect("/");
  },
};
