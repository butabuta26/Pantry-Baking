const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account.controller");
const { checkAuthenticated } = require("../middleware/auth");

router.get("/", checkAuthenticated, accountController.account);
router.get("/edit", checkAuthenticated, accountController.editProfile);
router.post("/edit", checkAuthenticated, accountController.updateProfile);

module.exports = router;