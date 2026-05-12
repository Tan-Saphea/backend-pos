const User = require("../models/users.model");
const { bcryptHash, bcryptCompare } = require("../utils/bcrypt.util");
const createToken = require("../utils/jwt.utils");

exports.signup = async (req, res, next) => {
  try {
    // console.log(req.body);

    //check if not input password
    if (!req.body.password) {
      return res.status(400).json({
        success: false,
        error: "Password is required",
      });
    }
    //hash password
    const hashed = await bcryptHash(req.body.password);

    const data = {
      ...req.body,
      password: hashed,
    };

    const doc = await User.create(data);

    res.status(201).json({
      success: true,
      result: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //1. validate email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    // 2. check if user exist in our database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    //3. compare password
    const isMatch = await bcryptCompare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid password",
      });
    }

    //4. create key token
    const token = createToken({ userId: user._id });

    //5. set token cia cookie
    res.cookie("token", token, {
      secure: process.emitWarning.NODE_ENV != "development",
      httpOnly: true,
      maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      result: { token },
    });
  } catch (error) {
    next(error);
  }
};
