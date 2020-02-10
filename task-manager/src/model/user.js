const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("user", {
  name: {
    type: String,
    trim: true,
    required: true
  },

  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw Error("You cannot add negative age");
      }
    }
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    }
  },

  password: {
    type: String,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password should not contain "password"');
      }
    },
    required: true
  }
});

module.exports = User;
