const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "pow#4", { expiresIn: "30d" });
};

module.exports = generateToken;
