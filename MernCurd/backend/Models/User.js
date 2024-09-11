const mongoose = require("mongoose");

const Joi = require("joi");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "backend/config.env" });

// user schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// generate verfication token
UserSchema.methods.generateVerificationToken = function () {
  user = this;
  const verficationToken = jwt.sign(
    { id: user.id?.valueOf() },
    process.env.SERECT_KEY,
    { algorithm: "HS256" }
  );
  return verficationToken;
};

// validate user
function validateUser(user) {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  return joiSchema.validateAsync(user);
}

// model
const User = mongoose.model("user", UserSchema);

module.exports = { User, validateUser };
