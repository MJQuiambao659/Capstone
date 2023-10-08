const bcrypt = require('bycrypt');

const saltRounds = 10;

module.exports = {
  hashPassword: async password => {
    return await bcrypt.hash(password, saltRounds);
  },
  comparePasswords: async(password, hash) => {
    return await bcrypt.compare(password,hash)
  }
}