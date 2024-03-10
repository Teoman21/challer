const { Login, Signup, DeleteAccount } = require("./authController");
const { verifyToken } = require("../middlewares/verifyToken")
const router = require("express").Router();

router.post("/signup", Signup)
router.post("/login", Login);
router.delete("/deleteAccount", verifyToken, DeleteAccount);


module.exports = router;