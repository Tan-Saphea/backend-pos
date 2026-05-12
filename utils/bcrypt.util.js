const bcrypt = require("bcrypt");

const bcryptHash = async (password) => {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
};

const bcryptCompare = async (password, hashed) => {
  const isMatch = await bcrypt.compare(password, hashed);
  return isMatch;
};

module.exports = {
  bcryptHash,
  bcryptCompare,
};
