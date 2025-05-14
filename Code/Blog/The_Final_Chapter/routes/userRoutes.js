"use strict";

const router = require("express").Router();
const newUserController = require("../controllers/newUser");
const storeUserController = require("../controllers/storeUser");
const loginController = require("../controllers/login");
const loginUserController = require("../controllers/loginUser");
const logoutController = require("../controllers/logout");
const redirectIfAuthenticatedMiddleware = require("../middleware/redirectIfAuthenticatedMiddleware");

router.get("/register", redirectIfAuthenticatedMiddleware, newUserController);
router.post("/register", redirectIfAuthenticatedMiddleware, storeUserController);
router.get("/login", redirectIfAuthenticatedMiddleware, loginController);
router.post("/login", redirectIfAuthenticatedMiddleware, loginUserController);
router.get("/logout", logoutController);

module.exports = router;