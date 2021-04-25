const bcrypt = require("bcryptjs");

function enccript(password) {
  ;let salt = bcrypt.genSaltSync(10);
  return (hash = bcrypt.hashSync(password, salt))
}
function comparePassword(password, dbPassword) {

  bcrypt.compare(password, dbPassword, (err, res) => {
    if(res){
      return true;
    }
    return false
  }); // true
}

module.exports ={enccript, comparePassword}
