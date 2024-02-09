const {Login} = require("../controller/authController");
const router = require("express").Router();

router.post("/login", Login);

module.exports = router;