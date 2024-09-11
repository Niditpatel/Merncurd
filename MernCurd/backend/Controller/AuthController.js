const { validateUser } = require("../Models/User");
const bcrypt = require("bcryptjs");
const { FindByEmail, createUser } = require("../Service/user.service");

exports.encryptValue = async (value) => {
  const salt = await bcrypt.genSalt(10);
  const hashValue = await bcrypt.hash(value, salt);
  return hashValue;
};

exports.registerUser = async (req, res) => {
  validateUser(req.body)
    .then(async (value) => {
      try {
        let user = await FindByEmail(value.email);
        if (user) {
          return res.status(200).json({
            message: "User already exists",
            success: 0,
          });
        } else {
          const userPassword = await encryptValue(password);
          user = await createUser({ ...value, password: userPassword });
          const verficationToken = await user.generateVerificationToken();
          res.status(200).json({
            success: 1,
            message: "You have registered successfully.",
            token: verficationToken,
          });
        }
      } catch (e) {
        res.status(400).json({ success: 0, message: e.message });
      }
    })
    .catch((e) => {
      res.status(400).json({ success: 0, message: e.message });
    });
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await FindByEmail(email);
    if (user) {
      const passMatch = await bcrypt.compare(password, user.password);
      if (passMatch) {
        const verficationToken = await user.generateVerificationToken();
        res.status(200).json({
          success: 1,
          message: "You have Loged in successfully.",
          token: verficationToken,
        });
      } else {
        res
          .status(400)
          .json({ success: 0, message: "Invalid username or password." });
      }
    } else {
      res
        .status(400)
        .json({ success: 0, message: "Invalid username or password." });
    }
  } catch (e) {
    res.status(400).json({ success: 0, message: e.message });
  }
};
