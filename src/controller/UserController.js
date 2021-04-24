const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { username, password } = req.body;
    let last_login = new Date();
    User.findOrCreate({
      where: { username: username },
      defaults: { password, last_login },
    }).spread(function (user, created) {
      if (created) {
        return res.send("Usuario cadastrado!");
      } else {
        return res.send("Usuario ja se encontra no servidor!");
      }
    });
  },
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },
  async delete(req, res) {},
};
