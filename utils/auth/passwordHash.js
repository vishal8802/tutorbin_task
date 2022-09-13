const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = (password) => bcrypt.hash(password, saltRounds);

const comparePassword = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

module.exports = { hashPassword, comparePassword };
