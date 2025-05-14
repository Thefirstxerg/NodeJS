"use strict";

const router = require("express").Router();
const userController = require("../controllers/userController");
const redirectIfAuthenticatedMiddleware = require("../middleware/redirectIfAuthenticatedMiddleware");

router.get("/register", redirectIfAuthenticatedMiddleware, userController.getRegister);
router.post("/register", redirectIfAuthenticatedMiddleware, userController.register);
router.get("/login", redirectIfAuthenticatedMiddleware, userController.getLogin);
router.post("/login", redirectIfAuthenticatedMiddleware, userController.login);
router.get("/logout", userController.logout);

module.exports = router;