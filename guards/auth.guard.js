const User = require("../models/users.model");
const { verifyToken } = require("../utils/jwt.utils");

const authGuard = async (req, res, next) => {
  try {
    let token = null;
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization) {
      let authHeader = req.headers.authorization.split(" ");
      if (authHeader[0] == "Bearer" && authHeader[1]) {
        token = authHeader[1];
      }
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Token invalit or expired!",
      });
    }
    const payload = verifyToken(token);

    console.log(payload);

    const user = await User.findById(payload.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized access",
      });
    }

    user.password = undefined;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authGuard,
};
