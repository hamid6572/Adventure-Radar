const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Enter name']
  },
  email: {
    type: String,
    required: [true, 'Enter email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
//    minlength: 8,
  },
});


module.exports = mongoose.model('User', userSchema);
