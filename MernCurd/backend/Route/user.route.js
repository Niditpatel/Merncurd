const router = require("express").Router();

const userController = require("../Controller/UserController");

const AuthMiddleWare = require("../Middleware/auth.middleware");

router.use(AuthMiddleWare.checkForAuthentication);

router.get("/:id", userController.GetDeatilofUser);

module.exports = router;
