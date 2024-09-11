const router = require("express").Router();

const blogController = require("../Controller/BlogController");

const AuthMiddleWare = require("../Middleware/auth.middleware");

router.use(AuthMiddleWare.checkForAuthentication);

router.post("/", blogController.CreateBlog);
router.put("/:id", blogController.UpdateBlog);

router.get("/:id", blogController.GetDeatilofBlog);
// router.put('/getList', blogController.);

router.delete("/:id", blogController.DeleteBlog);

module.exports = router;
