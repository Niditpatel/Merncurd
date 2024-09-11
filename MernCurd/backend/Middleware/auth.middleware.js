const jwt = require("jsonwebtoken");

exports.checkForAuthentication = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (token) {
    jwt.verify(
      token,
      process.env.SERECT_KEY,
      { algorithms: "HS256" },
      (err, user) => {
        if (!err) (req.user = user), next();
        else
          res
            .status(401)
            .json({ message: "You are not authorized to access this." });
      }
    );
  } else {
    res.status(403).json("Forbidden Access");
  }
};
