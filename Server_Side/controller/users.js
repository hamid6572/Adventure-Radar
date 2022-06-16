const User = require('../models/user');
// get all users
exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.json({
      User: user,
    });
  } catch (err) {
    return {
      status: 'Error',
      response: false,
      error: err.message,
    };
  }
};

// login
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find({ slug: req.params.slug });

    res.json({
      ...user,
    });
  } catch (err) {
    return {
      status: 'Error',
      error: err.message,
    };
  }
};

//sign up

exports.postUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    const email = req.params.email;
    const password = req.params.password;

    const user = new User({
      username: username,
      email: email,
      password: password,
    });
    await user.save();
    res.json({
      Success: 'User inserted!',
    });
  } catch (err) {
    return {
      status: 'Error',
      response: false,
      error: err.message,
    };
  }
};

// delete user

exports.deleteUser = async (req, res, next) => {
  console.log(req.params.id);
  try {
    await User.deleteOne({ _id: req.params.id });

    return {
      status: 'success',
      response: true,
    };
  } catch (err) {
    return {
      status: 'error',
      response: false,
      error: err.message,
    };
  }
};

// update user

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.find(` email : ${req.params.email}`);
    Object.assign(user, req.body);
    user.save();
    return {
      status: 'success',
      responce: true,
    };
  } catch (err) {
    return {
      status: 'Error',
      response: false,
      error: err.message,
    };
  }
};
