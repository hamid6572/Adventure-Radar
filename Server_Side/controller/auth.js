const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //checking validation on body of req
    const error = new Error("validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcryptjs.hash(password, 12); //encrypting password
    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    console.log(user);
    const userExist = await User.findOne({ email: email }); //user exists already
    if (userExist) {
      const err = new Error("user exits already");
      err.statusCode = 406; //not acceptable
      throw err;
    } else {
      await user.save(); //saving user in db
      res.json({
        Success: "user created successfully",
      });
    }
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email }); //checking user existence
    if (!user) {
      const err = new Error("No user with this email!");
      err.statusCode = 404;
      throw err;
    } else {
      const passwordMatch = await bcryptjs.compare(password, user.password);
      if (!passwordMatch) {
        const err = new Error("Password does not match!");
        err.statusCode = 402; //not authenticated
        throw err;
      }
      const token = jwt.sign(
        //storing web token on client side local storage
        {
          email: user.email,
          id: user._id,
        },
        "someverysecretkey",
        { expiresIn: "1000d" }
      );
      res.json({
        Success: "user logged in",
        token: token,
        userId: user._id,
      });
    }
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
exports.forgetPassword = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      //checking validation on body of req
      const error = new Error("validation failed!");
      error.data = errors.array();
      throw error;
    }
    const email = req.body.email;
    const userExist = await User.findOne({ email: email }); //user exists already
    if (!userExist) {
      const err = new Error("user does not exit.");
      err.statusCode = 404;
      throw err;
    } else {
      //Email to be send
    }
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
