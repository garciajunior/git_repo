const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        last_login: DataTypes.DATE,
      },
      { sequelize }
    );
  }
}
module.exports = User;